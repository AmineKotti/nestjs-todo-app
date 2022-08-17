import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import mongoose, { Document } from 'mongoose';
import { List } from 'src/list/list.schema';


export type NoteDocument = Note & Document;

@Schema()
export class Note {
  @Prop({ required: true })
  content: string;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'List' })
  listId : List;
}

export const NoteSchema = SchemaFactory.createForClass(Note);