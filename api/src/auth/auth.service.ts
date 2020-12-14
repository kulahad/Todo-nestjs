import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { userAuth, UserDetails } from './dto';
import { UsersService } from '../users/users.service';
import {} from '../users/dto/';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  createJWT(userData: UserDetails) {
    let payload = `${userData.email}${userData.username}`;
    const accessToken = this.jwtService.sign(payload);

    return {
      expires_in: 3600,
      access_token: accessToken,
      user_email: userData.email,
      status: 200,
    };
  }

  async login(userLogin: userAuth) {
    let user = await this.userService.findUserByUsername(userLogin.username);
    if (user) {
      let isUserValid = await bcrypt.compare(
        userLogin.password,
        user.passwordHash,
      );
      if (isUserValid) {
        let userData = {
          email: user.email,
          username: user.userName,
        };
        return this.createJWT(userData);
      }
    }
    throw new UnauthorizedException();
  }
}
