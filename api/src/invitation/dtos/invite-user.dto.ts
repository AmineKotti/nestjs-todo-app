import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { IsObjectId } from 'class-validator-mongo-object-id';


export enum UserPermission {
  read = 'read',
  readwrite = 'readwrite',
}

export class InviteUserToListDTO {

    @ApiProperty({type:String, description: 'userId'})
    @IsObjectId()
    @IsNotEmpty()
    userId: string;

    @ApiProperty({type:String, description: 'listId'})
    @IsObjectId()
    @IsNotEmpty()
    listId: string;
    
    @ApiProperty({enum: ['read', 'readwrite']})
    @IsNotEmpty()
    @IsEnum(UserPermission)
    permission:UserPermission;
  }
