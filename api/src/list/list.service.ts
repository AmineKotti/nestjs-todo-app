import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/user/user.schema';
import { UserService } from 'src/user/user.service';
import { InviteUserToListDTO } from '../invitation/dtos/invite-user.dto';
import { ListDTO } from './dtos/new-list.dto';
import { ListModule } from './list.module';
import { ListDocument } from './list.schema';

@Injectable()
export class ListService {
    constructor(
        @InjectModel('List') private readonly listModel: Model<ListModule>,
      ) {}

      create(listData: ListDTO,creator:string):Promise<any | null> {        
        const createdList = new this.listModel({
          ...listData,
          creator
        });

        return createdList.save();
      }

      async find(id: string): Promise<ListDocument> {
        return (await this.listModel.findById(id)).populate('creator');
      }
}
