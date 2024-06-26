import { Controller, Get, Param, Request } from '@nestjs/common';
import { Book } from '../../database/src/book';
import { BookService } from './book.service';

@Controller('books')
export class BookController {
  constructor(private _bookService: BookService) {}


  @Get()
  async findAll(): Promise<Book[]> {
    return;
  }

  @Get(':id')
  async findOne(@Param('id') id: number, @Request() req): Promise<Book> {
    console.log(req.user);
    return this._bookService.findBookById(id);
  }
}