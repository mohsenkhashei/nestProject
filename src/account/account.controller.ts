import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { AccountService } from './account.service';
import { CreateAccountDto } from './dto/create-account.dto';

@UseGuards(AuthGuard())
@Controller('account')
export class AccountController {
  constructor(private accountService: AccountService) {}

  @Get()
  getAllAccounts(@GetUser() user: User): Promise<User[]> {
    return this.accountService.getAllAccounts(user);
  }

  @Post()
  createAccount(
    @Body() createAccountDto: CreateAccountDto,
  ): Promise<{ code: string; role: string }> {
    return this.accountService.createAccount(createAccountDto);
  }
}
