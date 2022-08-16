import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/user/user.schema';
import { UserService } from 'src/user/user.service';
import { ListDTO } from './dtos/new-list.dto';
import { ListModule } from './list.module';

@Injectable()
export class ListService {
    constructor(
        @InjectModel('List') private readonly listModel: Model<ListModule>,
      ) {}

      create(listData: ListDTO):Promise<any | null> {        
        const createdList = new this.listModel({
          ...listData
        });

        return createdList.save();
      }     
}
