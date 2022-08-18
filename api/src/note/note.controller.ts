import { Body, Controller, Post, Get, UseGuards, Patch, Param, Delete, Request, Req, ForbiddenException } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOkResponse, ApiParam, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { AbilityFactory, Action } from 'src/ability/ability.factory';
import { GetUser } from 'src/auth/GetUser';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { InvitationService } from 'src/invitation/invitation.service';
import { ListService } from 'src/list/list.service';
import { User } from 'src/user/user.schema';
import { UserService } from 'src/user/user.service';
import { NoteDTO } from './dtos/new-note.dto';
import { UpdateNoteDTO } from './dtos/update-note.dto';
import { Note, NoteDocument } from './note.schema';
import { NoteService } from './note.service';


@ApiTags('note')
@Controller('note')
export class NoteController {
  constructor(private noteService:NoteService,
    private abilityFactory:AbilityFactory,
    private userService:UserService,
    private listService:ListService,
    private invitationService:InvitationService,
    ) {}

  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @ApiUnauthorizedResponse()
  @ApiBody({ type: NoteDTO })
  @Post('create')
  async create(@Body() note: NoteDTO,@GetUser() currentUser): Promise<NoteDocument | null> {
    
    const user = await this.userService.findByEmail(currentUser.email);
    const findList = await this.listService.find(note.listId);
    let isCreator = false;
    let permission = "";
    if(user._id.toString() === findList.creator['_id'].toString()){
       isCreator = true;
    }else{     
     const invitaion = await this.invitationService.findInvitaion(note.listId,user._id.toString());
     if(invitaion.length !== 0)
       permission = invitaion[0]['permission'];
    }
    const ability = this.abilityFactory.defineAbility(user,isCreator,permission)
    const isAllowed = ability.can(Action.Create, Note);
    if(!isAllowed)
     throw new ForbiddenException('only creator and user with readwrite permission can add notes!!');

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
