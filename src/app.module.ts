import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TerminusModule } from '@nestjs/terminus';
import { BookModule } from './book/book.module';
import { DatabaseModule } from './database/src/database.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [TerminusModule, BookModule, DatabaseModule, ConfigModule.forRoot({isGlobal: true})],
  controllers: [AppController],
})
export class AppModule {}
