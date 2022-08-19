import { ApiProperty } from "@nestjs/swagger";
import { IsEmpty, IsNotEmpty, IsString } from "class-validator";

export class ListDTO {
    @ApiProperty({type:String, description: 'name'})
    @IsNotEmpty()
    @IsString()
    name: string;
    @ApiProperty({type:String, description: 'description'})
    @IsString()
    description: string;
  }