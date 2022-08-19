import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class UserDTO {
    @ApiProperty({type:String, description: 'email'})
    @IsEmail()
    email: string;
    
    @ApiProperty({type:String, description: 'password'})
    @IsNotEmpty()
    password: string;
  }