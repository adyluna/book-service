import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TerminusModule } from '@nestjs/terminus';
import { BookModule } from './module/book/book.module';
import { DatabaseModule } from './database/src/database.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './module/user/user.module';
import { AuthModule } from './module/auth/auth.module';
import { AuthGuard } from './module/auth/auth.guard';

@Module({
  imports: [TerminusModule, BookModule, UserModule, DatabaseModule, ConfigModule.forRoot({isGlobal: true}), AuthModule],
  controllers: [AppController],
  providers: [
    {
      provide: 'APP_GUARD',
      useClass: AuthGuard,
    }
  ],
})
export class AppModule {}
