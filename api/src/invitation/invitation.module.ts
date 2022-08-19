import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ListModule } from 'src/list/list.module';
import { UserModule } from 'src/user/user.module';
import { InvitationController } from './invitation.controller';
import { InvitationSchema } from './invitation.schema';
import { InvitationService } from './invitation.service';

@Module({
  imports: [UserModule,ListModule,MongooseModule.forFeature([{ name: 'Invitation', schema: InvitationSchema }])],
  controllers: [InvitationController],
  providers: [InvitationService],
  exports: [InvitationService],
})
export class InvitationModule {}
