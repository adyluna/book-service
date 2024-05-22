import { Injectable } from '@nestjs/common';
import { Book } from './book.entity';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class BookRepository {
  constructor(
    @InjectModel(Book)
    private readonly _book: typeof Book,
  ) {}

  /**
   * Mocks the creation of a service in the database.
   * @param obj Object with data for persistence.
   * @returns Book.
   */
  create(obj: any): Promise<Book> {
    // Mock the service creation
    const book = new Book();
    Object.assign(book, obj);
    return Promise.resolve(book);
  }

  /**
   * Mocks finding a service by its ID.
   *
   * @param {number} id The ID of the service.
   */
  findById(id: number): Promise<Book> {
    return this._book.findByPk(id);
  }
}