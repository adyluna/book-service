import { HttpException, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly _jwtService: JwtService,
  ) {}

  async login(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new HttpException('User not found', 404)
    }

    const auth = await bcrypt.compare(password, user.password);
    if (!auth) {
      throw new HttpException('Invalid password', 401)
    }

    const payload = {
      sub: user.id,
      name: user.name,
      email: user.email,
    }

    return {
      access_token: await this._jwtService.signAsync(payload),
    };
  }
}
