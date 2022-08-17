import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import mongoose, { Document } from 'mongoose';
import { User } from 'src/user/user.schema';


export type ListDocument = List & Document;

@Schema()
export class List {
  @Prop({ required: true })
  name: string;
  @Prop()
  description: string;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  creator : User;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], })
  invitedusers : User;
}

export const  ListSchema = SchemaFactory.createForClass(List);