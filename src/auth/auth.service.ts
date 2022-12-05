import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { UsersRepository } from './users.repository';
import * as bcrypt from 'bcrypt';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';
import { ConfigService } from '@nestjs/config';
import { userRole } from './user-role.enum';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private usersRepository: UsersRepository,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}
  /**
   * check code existed if there check username existed if not regiser user
   * @param createUserDto
   * @returns
   */
  async signUp(createUserDto: CreateUserDto): Promise<User> {
    const { username, password, code } = createUserDto;

    const userExist = await this.usersRepository.findOne({
      where: { code: code },
    });

    if (userExist) {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);

      userExist.username = username;
      userExist.password = hashedPassword;
      await this.usersRepository.save(userExist);

      return userExist;
    } else {
      throw new ConflictException(
        `Username: ${username} Is Taken or Code: ${code} Already Registered`,
      );
    }
  }
  async signIn(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const { username, password } = authCredentialsDto;
    const user = await this.usersRepository.findOne({
      where: { username: username },
    });

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: JwtPayload = { username };
      const accessToken: string = await this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException('please check your login credentials');
    }
  }
  async createAdmin(): Promise<{ username: string; password: string }> {
    const username = this.configService.get('ADMIN_USER');
    const password = this.configService.get('ADMIN_PASS');
    const adminUser = await this.usersRepository.findOne({
      where: [{ username: username, role: userRole.ADMIN }],
    });
    if (adminUser) {
      adminUser.username = username;
      adminUser.password = password;
      await this.usersRepository.save(adminUser);
    } else {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);
      const data = await this.usersRepository.create({
        username: username,
        password: hashedPassword,
      });

      await this.usersRepository.save(data);
      return {
        username: username,
        password: password,
      };
    }
  }
}
