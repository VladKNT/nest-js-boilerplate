import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { TestModule } from './test/test.module';
import * as ormconfig from './database/config/ormconfig';

@Module({
  imports: [TypeOrmModule.forRoot(ormconfig), UsersModule, TestModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
