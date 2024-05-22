import { UserRepository } from '../../database/src/user/user.repository';
import { User } from '../../database/src/user/user.entity';
import { HttpException, Injectable, Logger } from '@nestjs/common';
import { CreateUserForm } from './user.form';

@Injectable()
export class UserService {
  constructor(
    private readonly _userRepository: UserRepository,
  ) {}

  private readonly _logger = new Logger(UserService.name);

  async findUserById(id: number): Promise<User> {
    const user = await this._userRepository.findById(id);
    if (!user) {
      throw new HttpException((`User with id ${id} not found`), 404);
    }
    return user;
  }

  async createUser(userData: CreateUserForm): Promise<any> {
    try {
      const newUser = await this._userRepository.create(userData);
      return {
        message: 'User created successfully',
        user: newUser,
      };
    } catch (error) {
      return {
        message: error,
      };
    }
  }

  async findByEmail(email: string): Promise<User> {
    return await this._userRepository.findByEmail(email);
  }
}