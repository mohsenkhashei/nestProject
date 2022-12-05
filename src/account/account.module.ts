import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { UsersRepository } from 'src/auth/users.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([UsersRepository, User]),
    AuthModule,
  ],
  providers: [AccountService],
  controllers: [AccountController],
})
export class AccountModule {}
