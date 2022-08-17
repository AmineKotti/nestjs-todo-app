import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Console } from 'console';
import { Model } from 'mongoose';
import { ListService } from 'src/list/list.service';
import { InviteUserToListDTO } from './dtos/invite-user.dto';
import { InvitationModule } from './invitation.module';

@Injectable()
export class InvitationService {
    constructor(
        private listService: ListService,
        @InjectModel('Invitation') private readonly invitationModel: Model<InvitationModule>,
      ) {}

    

    async inviteUserToList(invitaionData: InviteUserToListDTO):Promise<any | null> {
        const existingList = await this.listService.find(invitaionData.listId);
        if(existingList.creator['_id'].toString() === invitaionData.userId)
          throw new HttpException('creator of the list can not be invited!',HttpStatus.CONFLICT)
        

         const list = await this.invitationModel.find({listId : invitaionData.listId}).find({userId: invitaionData.userId});
         if(list.length !== 0)
          throw new HttpException('user is already invited to this list!',HttpStatus.CONFLICT)
         
        
        const createdInvitation = new this.invitationModel({
          ...invitaionData
        });

        return createdInvitation.save();
    }


}
