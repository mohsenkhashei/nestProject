import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { userRole } from 'src/auth/user-role.enum';
import { User } from 'src/auth/user.entity';
import { UsersRepository } from 'src/auth/users.repository';
import { CreateAccountDto } from './dto/create-account.dto';
import * as crypto from 'node:crypto';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(User) private usersRepository: UsersRepository,
  ) {}

  async getAllAccounts(user: User): Promise<User[]> {
    let condition;
    if (user.role === userRole.ADMIN) {
      condition = [{ role: userRole.SUPPORT }, { role: userRole.USER }];
    }
    if (user.role === userRole.SUPPORT) {
      condition = [{ role: userRole.USER }];
    }

    const result = await this.usersRepository.find({
      select: {
        id: true,
        username: true,
        code: true,
        role: true,
        updatedAt: true,
      },
      where: condition,
    });
    if (result) {
      return result;
    } else {
      throw new NotFoundException(`No Users Found`);
    }
  }
  async createAccount(
    createAccountDto: CreateAccountDto,
  ): Promise<{ code: string; role: string }> {
    const code = crypto.randomBytes(4).toString('hex');
    const { role } = createAccountDto;
    const result = {
      code: code,
      role: role,
    };
    const data = await this.usersRepository.create(result);
    await this.usersRepository.save(data);

    return result;
  }
}
