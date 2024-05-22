import { Injectable, Logger } from '@nestjs/common';
import { Book } from '../../database/src/book';
import { BookRepository } from '../../database/src/book';

@Injectable()
export class BookService {
  constructor(
    private readonly _bookRepository: BookRepository,
  ) {}

  private readonly _logger = new Logger(BookService.name);

  /**
   * Creates a new service.
   *
   * @param bookData Data of the service to be created.
   * @returns The created service.
   */
  async createBook(bookData: Partial<Book>): Promise<Book> {
    this._logger.log('Creating a new service');
    return this._bookRepository.create(bookData);
  }

  /**
   * Finds a service by its ID.
   *
   * @param id The ID of the service to find.
   * @returns The found service.
   */
  async findBookById(id: number): Promise<Book> {
    this._logger.log(`Finding a book with ID ${id}`);
    return this._bookRepository.findById(id);
  }
}