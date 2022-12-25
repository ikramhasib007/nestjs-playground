import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentailsDto } from './dto/auth-credentials.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  signUp(@Body() createUserDto: CreateUserDto): Promise<void> {
    return this.authService.signUp(createUserDto);
  }

  @Post('/signin')
  signIn(@Body() authCredentialsDto: AuthCredentailsDto): Promise<string> {
    return this.authService.signIn(authCredentialsDto);
  }
}
