import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class UpdateNoteDTO {
    @ApiProperty({type:String, description: 'content'})
    @IsString()
    @IsNotEmpty()
    content: string;
  }