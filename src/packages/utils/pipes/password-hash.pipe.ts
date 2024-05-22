import { Injectable, PipeTransform } from '@nestjs/common';
import { CreateUserForm } from '../../../module/user/user.form';
import * as bcrypt from 'bcrypt';
import * as process from 'node:process';

@Injectable()
export class PasswordHashPipe implements PipeTransform {
  async transform(createUserForm: CreateUserForm){

    createUserForm.password = await bcrypt.hash(createUserForm.password, process.env.SAL)
    return createUserForm;
  }
}