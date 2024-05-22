import { CanActivate, ExecutionContext, HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from './auth.public.decorator';
import { UserDto } from './dto/user.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly _jwtService: JwtService,
    private readonly _reflector: Reflector,
    private readonly _userService: UserService,
  ) {}

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const isPublic = this._reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) { return true; }

    const token = this._extractTokenFromHeader(request);
    if (!token) {
      throw new HttpException('Unauthorized', 401)
    }

    try {
      const payload: UserDto = await this._jwtService.verifyAsync(token);
      this._validateUser(payload);
      request.user = payload;
    } catch (error) {
      throw new HttpException('Unauthorized', 401)
    }

    return true;
  }

  private _extractTokenFromHeader(request: any): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  private _validateUser(payload: UserDto) {
    if (!this._userService.findByEmail(payload.email)) {
      throw new HttpException('Unauthorized', 401)
    }
  }
}
