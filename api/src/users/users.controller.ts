import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto } from './dto';



@Controller('users')
export class UsersController {
  constructor(private userService: UsersService){};

  @Post('register')
  async registerUser(@Body() user:CreateUserDto){
      return this.userService.registerUser(user);
  }
  
}
