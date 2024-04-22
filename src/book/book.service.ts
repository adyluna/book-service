import { Injectable, Logger } from '@nestjs/common';
import { Book } from '../database/src/book';
import { BookRepository } from '../database/src/book';

@Injectable()
export class BookService {
  constructor(
    private readonly _bookRepository: BookRepository,
  ) {}

  private readonly _logger = new Logger(BookService.name);

  /**
   * Creates a new book.
   *
   * @param bookData Data of the book to be created.
   * @returns The created book.
   */
  async createBook(bookData: Partial<Book>): Promise<Book> {
    this._logger.log('Creating a new book');
    return this._bookRepository.create(bookData);
  }

  /**
   * Finds a book by its ID.
   *
   * @param id The ID of the book to find.
   * @returns The found book.
   */
  async findBookById(id: number): Promise<Book> {
    this._logger.log(`Finding a book with ID ${id}`);
    return this._bookRepository.findById(id);
  }
}