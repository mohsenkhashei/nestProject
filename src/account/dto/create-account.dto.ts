import { userRole } from 'src/auth/user-role.enum';

export class CreateAccountDto {
  role: userRole;
}
