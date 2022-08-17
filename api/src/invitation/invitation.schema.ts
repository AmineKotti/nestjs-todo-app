import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import mongoose, { Document } from 'mongoose';
import { List } from 'src/list/list.schema';
import { User } from 'src/user/user.schema';


export type InvitationDocument = Invitation & Document;

@Schema()
export class Invitation {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  userId: User;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'List' })
  listId : List;
  @Prop({type: String, enum: ['read', 'readwrite']})
  permission: String;

}

export const  InvitationSchema = SchemaFactory.createForClass(Invitation);

