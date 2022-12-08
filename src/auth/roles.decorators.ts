import { SetMetadata } from '@nestjs/common';
import { userRole } from './user-role.enum';

export const Roles = (...roles: userRole[]) => SetMetadata('roles', roles);
