import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { InjectModel } from '@nestjs/sequelize';
import { UserDataDTO } from '../../../module/user/user.dto';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User)
    private readonly _user: typeof User,
  ) {}

  findById(id: number): Promise<User> {
    return this._user.findByPk(id,
      {
        attributes: {
          exclude: ['password', 'createdAt', 'modifiedAt']
        },
      });
  }

  async create(obj: any): Promise<UserDataDTO> {
    const newUser = await this._user.create(obj);
    return {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
    }
  }

  async findByEmail(email: string): Promise<User> {
    return this._user.findOne({
      where: {
        email,
      },
    });
  }
}