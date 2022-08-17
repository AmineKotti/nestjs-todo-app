import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { InviteUserToListDTO } from './dtos/invite-user.dto';
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

}
