import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { Book } from '../database/src/book';
import { BookService } from './book.service';

@Controller('books')
export class BookController {
  constructor(private _bookService: BookService) {}


  @Get()
  async findAll(): Promise<Book[]> {
    return;
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Book> {
    return this._bookService.findBookById(id);
  }

  @Post()
  async create(@Body() book: Book): Promise<Book> {
    return;
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() book: Book): Promise<Book> {
    return;
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return;
  }
}