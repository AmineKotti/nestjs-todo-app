import { Body, Controller, Delete, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiParam, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { GetUser } from 'src/auth/GetUser';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { InviteUserToListDTO } from './dtos/invite-user.dto';
import { UpdateCollaboratorPrivilegeDto } from './dtos/update-collaborator-privilege.dto';
import { InvitationDocument } from './invitation.schema';
import { InvitationService } from './invitation.service';

@ApiTags('invitation')
@Controller('invitation')
export class InvitationController {
    constructor(private inviteService: InvitationService) {}

    @ApiBearerAuth()
    @UseGuards(JwtGuard)
    @ApiUnauthorizedResponse()
    @ApiBody({ type: InviteUserToListDTO })
    @Post('inviteUserToList')
    invitation(@Body() inviteUserToListDTO: InviteUserToListDTO): Promise<InvitationDocument | null> {
      return this.inviteService.inviteUserToList(inviteUserToListDTO);
    }

    @ApiBearerAuth()
    @UseGuards(JwtGuard)
    @ApiUnauthorizedResponse()
    @ApiBody({ type: UpdateCollaboratorPrivilegeDto })
    @ApiParam({
      type: String,
      name: 'collaboratorId'
    })
    @Patch(':collaboratorId')
    async updateCollaboratorPrivilege(
      @Param('collaboratorId') collaboratorId: string,
      @Body() updateCollaboratorDto : UpdateCollaboratorPrivilegeDto,@GetUser() currentUser
    ) {   
      return await this.inviteService.updateCollaboratorPrivilege(collaboratorId,currentUser, updateCollaboratorDto);
    }

    @ApiBearerAuth()
    @UseGuards(JwtGuard)
    @ApiUnauthorizedResponse()
    @ApiParam({
      type: String,
      name: 'collaboratorId'
    })
    @ApiParam({
      type: String,
      name: 'listId'
    })
    @Delete(':listId/:collaboratorId')
    async delete(@Param('collaboratorId') collaboratorId: string,@Param('listId') listId: string,@GetUser() currentUser) {
      return this.inviteService.deleteCollaborator(collaboratorId,listId,currentUser);
    }

}
