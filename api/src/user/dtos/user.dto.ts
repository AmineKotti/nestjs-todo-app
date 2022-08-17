import { ApiProperty } from '@nestjs/swagger';

export class UserDTO {
    @ApiProperty({type:String, description: 'email'})
    email: string;
    
    @ApiProperty({type:String, description: 'password'})
    password: string;
  }