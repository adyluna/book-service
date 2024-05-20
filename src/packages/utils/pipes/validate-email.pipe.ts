import { HttpException, HttpStatus, Injectable, PipeTransform } from '@nestjs/common';
import { UserService } from '../../../module/user/user.service';
import { CreateUserForm } from '../../../module/user/user.form';

@Injectable()
export class ValidateEmailPipe implements PipeTransform {
  constructor(private readonly _userService: UserService) {}

  async transform(createUserForm: CreateUserForm) {
    const user = await this._userService.findByEmail(createUserForm.email);
    if (user) {
      throw new HttpException('Email already exists', HttpStatus.BAD_REQUEST);
    }
    return createUserForm;

  }
}