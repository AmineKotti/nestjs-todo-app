import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import mongoose, { Document } from 'mongoose';
import { List } from 'src/list/list.schema';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true, unique: true })
  email: string;
  @Prop({ required: true })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);