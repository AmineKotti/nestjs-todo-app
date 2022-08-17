import { ApiProperty } from "@nestjs/swagger";

export class InviteUserToListDTO {
    @ApiProperty({type:String, description: 'userId'})
    userId: string;
    @ApiProperty({type:String, description: 'listId'})
    listId: string;
    @ApiProperty({enum: ['read', 'readwrite']})
    permission:UserPermission;
  }

  export enum UserPermission {
    read = 'read',
    readwrite = 'readwrite',
  }