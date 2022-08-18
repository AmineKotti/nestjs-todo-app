import { ApiProperty } from "@nestjs/swagger";

export class ListDTO {
    @ApiProperty({type:String, description: 'name'})
    name: string;
    @ApiProperty({type:String, description: 'description'})
    description: string;
  
  }