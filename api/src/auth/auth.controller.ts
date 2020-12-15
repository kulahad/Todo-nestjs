import { Controller, Post, Body } from '@nestjs/common';
import { Public } from './auth.guard';
import { AuthService } from './auth.service';
import { userAuth } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  async login(@Body() userAuth: userAuth): Promise<any> {
    return this.authService.login(userAuth);
  }
}
