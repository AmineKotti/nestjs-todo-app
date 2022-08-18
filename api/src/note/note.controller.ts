import { Body, Controller, Post, Get, UseGuards, Patch, Param, Delete, Request, Req, ForbiddenException } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOkResponse, ApiParam, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { AbilityFactory, Action } from 'src/ability/ability.factory';
import { GetUser } from 'src/auth/GetUser';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { InvitationService } from 'src/invitation/invitation.service';
import { ListService } from 'src/list/list.service';
import { User, UserDocument } from 'src/user/user.schema';
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

   async userListInfo(user: UserDocument,listId:string){
    const findList = await this.listService.find(listId);

    let isCreator = false;
    let permission = "";
    if(user._id.toString() === findList.creator['_id'].toString()){
       isCreator = true;
    }else{     
     const invitaion = await this.invitationService.findInvitaion(listId,user._id.toString());
     if(invitaion.length !== 0)
       permission = invitaion[0]['permission'];
    }
    const userListInfo = {isCreator:isCreator,permission:permission};
    return userListInfo;
   }

  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @ApiUnauthorizedResponse()
  @ApiBody({ type: NoteDTO })
  @Post('create')
  async create(@Body() note: NoteDTO,@GetUser() currentUser): Promise<NoteDocument | null> {
     const user = await this.userService.findByEmail(currentUser.email);
     let userListInfo =await this.userListInfo(user, note.listId)
    const ability = this.abilityFactory.defineAbility(user,userListInfo.isCreator,userListInfo.permission);
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
  async findAllNotes(@Param('listId') listId: string,@GetUser() currentUser
  ): Promise<NoteDocument[]> {   
    const user = await this.userService.findByEmail(currentUser.email);
    let userListInfo =await this.userListInfo(user, listId)
    const ability = this.abilityFactory.defineAbility(user,userListInfo.isCreator,userListInfo.permission);
    const isAllowed = ability.can(Action.Read, Note);
    if(!isAllowed)
     throw new ForbiddenException('user is not invited to this list!!');

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
  async updateNote(
    @Param('id') id: string,
    @Body() updateNoteDTO : UpdateNoteDTO,@GetUser() currentUser
  ): Promise<NoteDocument> {   
    const note = await this.noteService.find(id);
    const user = await this.userService.findByEmail(currentUser.email);

    let userListInfo =await this.userListInfo(user, note.listId['_id'].toString())

    const ability = this.abilityFactory.defineAbility(user,userListInfo.isCreator,userListInfo.permission);
    const isAllowed = ability.can(Action.Update, Note);
    if(!isAllowed)
     throw new ForbiddenException('only creator and user with readwrite permission can update notes!!');

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
  async deleteNote(@Param('id') id: string,@GetUser() currentUser) {
    const note = await this.noteService.find(id);
    const user = await this.userService.findByEmail(currentUser.email);
    let userListInfo =await this.userListInfo(user, note.listId['_id'].toString())
    const ability = this.abilityFactory.defineAbility(user,userListInfo.isCreator,userListInfo.permission);
    const isAllowed = ability.can(Action.Update, Note);
    if(!isAllowed)
     throw new ForbiddenException('only creator and user with readwrite permission can delete notes!!');
    return this.noteService.delete(id);
  }
}
