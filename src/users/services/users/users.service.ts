import { Injectable } from '@nestjs/common';
import * as crypto from 'node:crypto';

@Injectable()
export class UsersService {
  findUser() {
    const code = crypto.randomBytes(4).toString('hex');

    return {
      id: code,
      email: 'asdfasd',
    };
  }
}
