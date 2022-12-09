import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { GetUser } from 'src/auth/get-user.decorator';
import { JwtGuard } from 'src/auth/jwt.guard';
import { Roles } from 'src/auth/roles.decorators';
import { RolesGuard } from 'src/auth/roles.guard';
import { userRole } from 'src/auth/user-role.enum';
import { User } from 'src/auth/user.entity';
import { AccountService } from './account.service';
import { CreateAccountDto } from './dto/create-account.dto';

@ApiBearerAuth()
@ApiTags('Accounts Management')
@UseGuards(JwtGuard, RolesGuard)
@Controller('account')
export class AccountController {
  constructor(private accountService: AccountService) {}

  @ApiOperation({ summary: 'Get All Accounts Admin/Support' })
  @ApiOkResponse({ type: User, isArray: true })
  @ApiResponse({ status: 404, description: `No Users Found` })
  @Roles(userRole.ADMIN, userRole.SUPPORT)
  @Get()
  getAllAccounts(@GetUser() user: User): Promise<User[]> {
    return this.accountService.getAllAccounts(user);
  }

  @ApiOperation({
    summary: 'Create Account With Role & Generate Code ( Admin )',
  })
  @ApiResponse({ status: 200, description: 'Code & Role' })
  @Roles(userRole.ADMIN)
  @Post()
  createAccount(
    @Body() createAccountDto: CreateAccountDto,
  ): Promise<{ code: string; role: string }> {
    return this.accountService.createAccount(createAccountDto);
  }
}
