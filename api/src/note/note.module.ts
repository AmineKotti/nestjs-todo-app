import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AbilityModule } from 'src/ability/ability.module';
import { InvitationModule } from 'src/invitation/invitation.module';
import { ListModule } from 'src/list/list.module';
import { UserModule } from 'src/user/user.module';
import { NoteController } from './note.controller';
import { NoteSchema } from './note.schema';
import { NoteService } from './note.service';

@Module({
  imports: [InvitationModule,ListModule,UserModule,AbilityModule, MongooseModule.forFeature([{ name: 'Note', schema: NoteSchema }])],
  controllers: [NoteController],
  providers: [NoteService]
})
export class NoteModule {}
