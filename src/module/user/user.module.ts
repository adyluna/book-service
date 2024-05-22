import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../../database/src/user/user.entity';
import { UserService } from './user.service';
import { UserRepository } from '../../database/src/user/user.repository';
import { UserController } from './user.controller';

@Module({
  imports: [
    SequelizeModule.forFeature([User])
  ],
  providers: [UserService, UserRepository, SequelizeModule],
  controllers: [UserController],
  exports: [UserService]
})
export class UserModule {}