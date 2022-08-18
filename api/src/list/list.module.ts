import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from 'src/user/user.module';
import { ListController } from './list.controller';
import { ListSchema } from './list.schema';
import { ListService } from './list.service';

@Module({
  imports: [UserModule,MongooseModule.forFeature([{ name: 'List', schema: ListSchema }])],
  controllers: [ListController],
  providers: [ListService],
  exports: [ListService],
})
export class ListModule {}
