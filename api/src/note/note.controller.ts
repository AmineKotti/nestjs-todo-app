import { Body, Controller, Post, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { NoteDTO } from './dtos/new-note.dto';
import { NoteDocument } from './note.schema';
import { NoteService } from './note.service';


@ApiTags('note')
@Controller('note')
export class NoteController {
  constructor(private noteService: NoteService) {}

  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @ApiUnauthorizedResponse()
  @ApiBody({ type: NoteDTO })
  @Post('create')
  create(@Body() note: NoteDTO): Promise<NoteDocument | null> {
    return this.noteService.create(note);
  }

  @ApiBearerAuth()
  @ApiOkResponse()
  @Get()
  @UseGuards(JwtGuard)
  async findAll(
  ): Promise<NoteDocument[]>{
    return await this.noteService.findAll();
  }

   

}
