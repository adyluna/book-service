import { UserService } from './user.service';
import { Body, Controller, Get, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { PasswordHashPipe } from '../../packages/utils/pipes/password-hash.pipe';
import { CreateUserForm } from './user.form';
import { ValidateEmailPipe } from '../../packages/utils/pipes/validate-email.pipe';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  async findUserById(@Param('id') id: number) {
    return this.userService.findUserById(id);
  }

  @Post()
  @UsePipes(new ValidationPipe(), ValidateEmailPipe, PasswordHashPipe)
  async createUser(
    @Body() createUserForm: CreateUserForm,
  ) {
    return this.userService.createUser(createUserForm);
  }
}