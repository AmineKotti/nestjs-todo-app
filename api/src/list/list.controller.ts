import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserDTO } from 'src/user/dtos/user.dto';
import { ListDTO } from './dtos/new-list.dto';
import { ListDocument } from './list.schema';
import { ListService } from './list.service';

@Controller('list')
export class ListController {
    constructor(private listService: ListService) {}

    @Post('create')
    create(@Body() list: ListDTO): Promise<ListDocument | null> {
      return this.listService.create(list);
    }
}
