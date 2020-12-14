import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { userAuth, UserDetails } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('login')
  async login(@Body() userAuth: userAuth): Promise<any> {
    return this.authService.login(userAuth);
  }
}
