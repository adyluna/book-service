import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { Book } from '../../database/src/book';
import { BookRepository } from '../../database/src/book';

@Module({
  imports: [
    SequelizeModule.forFeature([Book]),
  ],
  providers: [BookService, BookRepository, SequelizeModule],
  controllers: [BookController],
})
export class BookModule {}