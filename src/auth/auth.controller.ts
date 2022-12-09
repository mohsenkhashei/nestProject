import { Body, Controller, Get, Post } from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiTags('Authentication & Authorization')
  @ApiOperation({ summary: 'USER/SUPPORT with Code can signup' })
  @ApiOkResponse({ type: User })
  @ApiResponse({ status: 404, description: `User ConflictException` })
  @Post('/signup')
  signup(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.authService.signUp(createUserDto);
  }

  @ApiTags('Authentication & Authorization')
  @ApiOperation({ summary: 'All Roles Signing' })
  @ApiOkResponse({ description: 'accessToken' })
  @ApiResponse({
    status: 401,
    description: `please check your login credentials`,
  })
  @Post('/signin')
  signin(
    @Body() authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(authCredentialsDto);
  }

  @ApiTags('Admin Account Info')
  @ApiOperation({ summary: 'Getting The Admin Credentinal' })
  @ApiOkResponse({ description: 'admin username & password' })
  @Get()
  getAdmin(): Promise<{ username: string; password: string }> {
    return this.authService.createAdmin();
  }
}
