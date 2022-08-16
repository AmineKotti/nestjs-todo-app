import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { ListDTO } from './dtos/new-list.dto';
import { ListDocument } from './list.schema';
import { ListService } from './list.service';

@ApiTags('list')
@Controller('list')
export class ListController {
    constructor(private listService: ListService) {}

    @ApiBearerAuth()
    @UseGuards(JwtGuard)
    @ApiUnauthorizedResponse()
    @ApiBody({ type: ListDTO })
    @Post('create')
    create(@Body() list: ListDTO): Promise<ListDocument | null> {
      return this.listService.create(list);
    }
}
