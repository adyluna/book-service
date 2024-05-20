import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TerminusModule } from '@nestjs/terminus';
import { BookModule } from './module/book/book.module';
import { DatabaseModule } from './database/src/database.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './module/user/user.module';

@Module({
  imports: [TerminusModule, BookModule, UserModule, DatabaseModule, ConfigModule.forRoot({isGlobal: true})],
  controllers: [AppController],
})
export class AppModule {}
