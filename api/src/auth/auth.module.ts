import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';


@Module({
  imports: [UsersModule,
    JwtModule.register({
      secret: 's12356789'
    })],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
