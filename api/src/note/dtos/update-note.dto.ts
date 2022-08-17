import { ApiProperty } from "@nestjs/swagger";

export class UpdateNoteDTO {
    @ApiProperty({type:String, description: 'content'})
    content: string;
  }