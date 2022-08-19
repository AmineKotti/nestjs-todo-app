import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";
import { IsObjectId } from "class-validator-mongo-object-id";

export class NoteDTO {
    @ApiProperty({type:String, description: 'content'})
    @IsNotEmpty()
    @IsString()
    content: string;
    @ApiProperty({type:String, description: 'listId'})
    @IsObjectId()
    @IsNotEmpty()
    listId:string;
  }