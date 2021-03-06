import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskModule } from './tasks/tasks.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { JwtAuthGuard } from './auth/auth.guard';
import { APP_GUARD } from '@nestjs/core';


@Module({
  imports: [
    ConfigModule.forRoot(),
    TaskModule,
    MongooseModule.forRoot(process.env.DATABASE_PATH),
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },],
})
export class AppModule {}
