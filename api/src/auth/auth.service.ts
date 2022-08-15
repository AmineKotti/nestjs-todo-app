import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';

import * as bcrypt from 'bcrypt';
import { NewUserDTO } from 'src/user/dtos/new-user.dto';
import { UserDetails } from 'src/user/user-details.interface';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
    ) {}

    async hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, 12);
    }

    async register(user: Readonly<NewUserDTO>): Promise<UserDetails | any> {
        const { email, password } = user;
    
        const existingUser = await this.userService.findByEmail(email);
    
        if (existingUser)
          throw new HttpException('An account with that email already exists!',
            HttpStatus.CONFLICT,
          );
    
        const hashedPassword = await this.hashPassword(password);
    
        const newUser = await this.userService.create(email, hashedPassword);
        return this.userService._getUserDetails(newUser);
      }
}
