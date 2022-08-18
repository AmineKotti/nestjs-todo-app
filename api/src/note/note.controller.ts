import { Body, Controller, Post, Get, UseGuards, Patch, Param, Delete } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOkResponse, ApiParam, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { NoteDTO } from './dtos/new-note.dto';
import { UpdateNoteDTO } from './dtos/update-note.dto';
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
  @UseGuards(JwtGuard)
  @ApiUnauthorizedResponse()
  @ApiParam({
    type: String,
    name: 'listId'
  })
  @Get(':listId')
  findAllNotes(
    @Param('listId') listId: string,
  ): Promise<NoteDocument[]> {   
    return this.noteService.findAllByListId(listId);
  }

  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @ApiUnauthorizedResponse()
  @ApiBody({ type: UpdateNoteDTO })
  @ApiParam({
    type: String,
    name: 'id'
  })
  @Patch(':id')
  updateNote(
    @Param('id') id: string,
    @Body() updateNoteDTO : UpdateNoteDTO
  ): Promise<NoteDocument> {   
    return this.noteService.update(id, updateNoteDTO);
  }

  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @ApiUnauthorizedResponse()
  @ApiParam({
    type: String,
    name: 'id'
  })
  @Delete(':id')
  deleteNote(@Param('id') id: string) {
    return this.noteService.delete(id);
  }

   

}
