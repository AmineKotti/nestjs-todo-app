import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { UserDTO } from 'src/user/dtos/user.dto';
import { UserDetails } from 'src/user/user-details.interface';
import { AuthService } from './auth.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @ApiCreatedResponse({ description: 'User Registration' })
    @ApiBody({ type: UserDTO })
    @Post('register')
    register(@Body() user: UserDTO): Promise<UserDetails | null> {
      return this.authService.register(user);
    }

    @Post('login')
    @HttpCode(HttpStatus.OK)
    @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
    @ApiBody({ type: UserDTO })
    login(@Body() user: UserDTO): Promise<{ token: string } | null> {
      return this.authService.login(user);
    }
}
