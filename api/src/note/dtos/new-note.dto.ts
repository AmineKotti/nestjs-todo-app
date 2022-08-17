import { ApiProperty } from "@nestjs/swagger";

export class NoteDTO {
    @ApiProperty({type:String, description: 'content'})
    content: string;
    @ApiProperty({type:String, description: 'listId'})
    listId:string;
  }