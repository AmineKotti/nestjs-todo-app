import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { ListModule } from './list/list.module';
import { NoteModule } from './note/note.module';
import { InvitationModule } from './invitation/invitation.module';
import { AbilityModule } from './ability/ability.module';


@Module({
  imports: [ 
  ConfigModule.forRoot({
      isGlobal: true,
    }),
  MongooseModule.forRoot('mongodb://localhost:27017/todo'), 
  AuthModule, UserModule, ListModule, NoteModule, InvitationModule, AbilityModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
