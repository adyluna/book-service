import { BookService } from '../../src/module/book/book.service';
import { Test, TestingModule } from '@nestjs/testing';
import { bookServiceProviders } from '../utils/model.utils';

describe('BookService Tests', () => {
  let service: BookService;
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      providers: bookServiceProviders,
    }).compile();

    service = module.get(BookService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should find a book', async () => {
    const book = await service.findBookById(1);
    expect(book).toBeDefined();
    expect(book.id).toBe(1);
    expect(book.name).toBe('Teste');
  });
});