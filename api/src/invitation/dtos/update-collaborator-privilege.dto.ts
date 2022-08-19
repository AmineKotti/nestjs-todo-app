import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty } from "class-validator";
import { IsObjectId } from "class-validator-mongo-object-id";
import { UserPermission } from "./invite-user.dto";

export class UpdateCollaboratorPrivilegeDto {
    @ApiProperty({type:String, description: 'listId'})
    @IsObjectId()
    @IsNotEmpty()
    listId: string;

    @ApiProperty({enum: ['read', 'readwrite']})
    @IsNotEmpty()
    @IsEnum(UserPermission)
    permission:UserPermission;
  }