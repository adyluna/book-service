import { BookService } from '../../src/module/book/book.service';
import { BookRepository } from '../../src/database/src/book';

export const bookMock = {
  id: 1,
  name: 'Teste',
}

export const bookServiceProviders = [
  BookService,
  {
    provide: BookRepository,
    useValue: {
      findById: jest.fn().mockResolvedValue(bookMock)
    }
  }
]