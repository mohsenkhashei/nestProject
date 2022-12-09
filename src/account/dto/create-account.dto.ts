import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { userRole } from 'src/auth/user-role.enum';

export class CreateAccountDto {
  @IsNotEmpty()
  @ApiProperty({ type: 'string', enum: [userRole] })
  role: userRole;
}
