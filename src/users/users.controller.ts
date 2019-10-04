import { Controller, Get, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserEntity } from '../database/models/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() user: CreateUserDto): Promise<UserEntity> {
    return this.usersService.create(user);
  }

  @Get()
  findAll(): Promise<UserEntity[]> {
    return this.usersService.findAll();
  }
}
