import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from '../services/users.service';
import { User } from '../../../database/models/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard())
  @Post()
  async create(@Body() user: CreateUserDto): Promise<User> {
    return this.usersService.create(user);
  }

  @UseGuards(AuthGuard())
  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }
}
