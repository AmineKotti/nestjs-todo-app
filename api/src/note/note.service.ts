import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NoteDTO } from './dtos/new-note.dto';
import { UpdateNoteDTO } from './dtos/update-note.dto';
import { NoteDocument } from './note.schema';

@Injectable()
export class NoteService {
    constructor(
        @InjectModel('Note') private readonly noteModel: Model<NoteDocument>,
      ) {}

      
      create(noteData: NoteDTO):Promise<any | null> {        
        const createdNote = new this.noteModel({
          ...noteData
        });

        return createdNote.save();
      }
      
      async findAllByListId(listId: string): Promise<NoteDocument[]> {
        return this.noteModel.find({listId:listId}).populate('listId');
      }

      async find(id: string): Promise<NoteDocument> {
        return await this.noteModel.findById(id).populate('listId');
      }


      async update(
        id: string,
        noteData: UpdateNoteDTO,
      ): Promise<NoteDocument> {
       
        let existingNote = await this.find(id);
        existingNote.content = noteData.content;
        
        return existingNote.save();
      }
    
      async delete(id: string) {
        return this.noteModel.deleteOne({ _id: id }).exec();
      }
}
