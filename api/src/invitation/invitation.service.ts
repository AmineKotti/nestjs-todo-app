import { identity } from '@casl/ability/dist/types/utils';
import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Console } from 'console';
import { Model } from 'mongoose';
import { ListService } from 'src/list/list.service';
import { UserDetails } from 'src/user/user-details.interface';
import { UserService } from 'src/user/user.service';
import { InviteUserToListDTO } from './dtos/invite-user.dto';
import { UpdateCollaboratorPrivilegeDto } from './dtos/update-collaborator-privilege.dto';
import { InvitationModule } from './invitation.module';

@Injectable()
export class InvitationService {
    constructor(
        private listService: ListService,
        private userService: UserService,
        @InjectModel('Invitation') private readonly invitationModel: Model<InvitationModule>,
      ) {}

    

    async inviteUserToList(invitaionData: InviteUserToListDTO):Promise<any | null> {
        const existingUser = await this.userService.findById(invitaionData.userId);
        if(existingUser === null){
          throw new HttpException('user not exist!',HttpStatus.CONFLICT)
        }
        const existingList = await this.listService.find(invitaionData.listId);
        if(existingList === null)
          throw new HttpException('list not exist!',HttpStatus.CONFLICT)
        if(existingList.creator['_id'].toString() === invitaionData.userId)
          throw new HttpException('creator of the list can not be invited!',HttpStatus.CONFLICT)
        
         const list = await this.findInvitaion(invitaionData.listId,invitaionData.userId);
         
         if(list.length !== 0)
          throw new HttpException('user is already invited to this list!',HttpStatus.CONFLICT)
         
        
        const createdInvitation = new this.invitationModel({
          ...invitaionData
        });

        return createdInvitation.save();
    }

    async findInvitaion(listId:string,userId:string):Promise<any>{
      const invitaion = await this.invitationModel.find({listId : listId}).find({userId: userId}).exec();      
      return invitaion;
    }


    async updateCollaboratorPrivilege(collaboratorId:string,currentUser:UserDetails,updateCollaboratorDto:UpdateCollaboratorPrivilegeDto){
      const existingList = await this.listService.find(updateCollaboratorDto.listId);
      if(existingList === null)
        throw new HttpException('list not exist!',HttpStatus.CONFLICT)
      const user = await this.userService.findByEmail(currentUser.email);
      if(existingList.creator['_id'].toString() !== user._id.toString())
      throw new HttpException('only creator of list can updated collaborators Privilege!',HttpStatus.CONFLICT)
      let existingInvitaion = await this.findInvitaion(updateCollaboratorDto.listId, collaboratorId)
      if(existingInvitaion.length === 0)
        throw new HttpException('collaborator not invited to this list!',HttpStatus.CONFLICT)
    
      const updateInvitaion = await this.invitationModel.updateOne({ _id: existingInvitaion[0]._id.toString() },{permission:updateCollaboratorDto.permission}).exec();
      
      return updateInvitaion;
    }

    async deleteCollaborator(collaboratorId:string,listId:string,currentUser:UserDetails){            
      const existingList = await this.listService.find(listId);
      if(existingList === null)
        throw new HttpException('list not exist!',HttpStatus.CONFLICT)

      const user = await this.userService.findByEmail(currentUser.email);
      if(existingList.creator['_id'].toString() !== user._id.toString())
      throw new HttpException('only creator of list can updated collaborators Pvilege!',HttpStatus.CONFLICT)
      let existingInvitaion = await this.findInvitaion(listId, collaboratorId)
      if(existingInvitaion.length === 0)
        throw new HttpException('collaborator not invited to this list!',HttpStatus.CONFLICT)
    
      return await this.invitationModel.deleteOne({ _id: existingInvitaion[0]._id.toString() }).exec();
    }

}
