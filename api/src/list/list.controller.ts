import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { GetUser } from 'src/auth/GetUser';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { UserService } from 'src/user/user.service';
import { ListDTO } from './dtos/new-list.dto';
import { ListDocument } from './list.schema';
import { ListService } from './list.service';


@ApiTags('list')
@Controller('list')
export class ListController {
    constructor(private listService: ListService,
      private userService: UserService) {}

    @ApiBearerAuth()
    @UseGuards(JwtGuard)
    @ApiUnauthorizedResponse()
    @ApiBody({ type: ListDTO })
    @Post('create')
    async create(@Body() list: ListDTO,@GetUser() currentUser): Promise<ListDocument | null> {
      const user =await this.userService.findByEmail(currentUser.email);
      return this.listService.create(list, user._id);
    }
}
