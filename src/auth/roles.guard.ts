import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler()); // geting allowed roles for this method
    if (!roles) return true;

    const request = context.switchToHttp().getRequest();
    if (roles.includes(request.user.role)) {
      return true;
    }
    throw new ForbiddenException(
      `This operation is not allowed by role: ${request.user.role}`,
    );
  }
}
