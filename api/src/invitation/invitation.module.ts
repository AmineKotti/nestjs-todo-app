import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ListModule } from 'src/list/list.module';
import { InvitationController } from './invitation.controller';
import { InvitationSchema } from './invitation.schema';
import { InvitationService } from './invitation.service';

@Module({
  imports: [ListModule,MongooseModule.forFeature([{ name: 'Invitation', schema: InvitationSchema }])],
  controllers: [InvitationController],
  providers: [InvitationService],
  
})
export class InvitationModule {}
