import { Ability, AbilityBuilder, AbilityClass, ExtractSubjectType, InferSubjects } from "@casl/ability";
import { Injectable } from "@nestjs/common";
import { Note } from "src/note/note.schema";
import { User, UserDocument } from "src/user/user.schema";


export enum Action {
    Manage = 'manage',
    Create = 'create',
    Read = 'read',
    Update = 'update',
    Delete = 'delete',
}

type Subjects = InferSubjects<typeof Note | typeof User> | 'all';

export type AppAbility = Ability<[Action, Subjects]>;





@Injectable()
export class AbilityFactory {
    defineAbility(user: UserDocument, isCreator?:boolean, permission?: string){

    const { can, cannot, build } = new AbilityBuilder<
      Ability<[Action, Subjects]>
    >(Ability as AbilityClass<AppAbility>);

    if(isCreator === true || permission === 'readwrite'){
      can(Action.Create, Note);
      can(Action.Update, Note);
      can(Action.Delete, Note);
      can(Action.Read, Note); 
    }else if(permission === 'read'){
      can(Action.Read, Note); 
      cannot(Action.Create, Note);
      cannot(Action.Update, Note);
      cannot(Action.Delete, Note);
    }else if(permission === ""){
      cannot(Action.Create, Note);
      cannot(Action.Update, Note);
      cannot(Action.Delete, Note);
      cannot(Action.Read, Note); 
    }
 
    return build({
     detectSubjectType: (item) =>
       item.constructor as ExtractSubjectType<Subjects>,
    });
    }
}
