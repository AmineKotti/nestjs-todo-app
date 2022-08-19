import { ApiProperty } from "@nestjs/swagger";
import { UserPermission } from "./invite-user.dto";

export class UpdateCollaboratorPrivilegeDto {
    @ApiProperty({type:String, description: 'listId'})
    listId: string;
    @ApiProperty({enum: ['read', 'readwrite']})
    permission:UserPermission;
  }