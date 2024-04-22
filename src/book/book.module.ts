import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { Book } from '../database/src/book/book.entity';
import { BookRepository } from '../database/src/book/book.repository';

@Module({
  imports: [
    SequelizeModule.forFeature([Book]),
  ],
  providers: [BookService, BookRepository, SequelizeModule],
  controllers: [BookController],
})
export class BookModule {}