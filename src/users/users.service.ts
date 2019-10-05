import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../database/models/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    const user = Object.assign(new UserEntity(), createUserDto);
    return this.userRepository.save(user);
  }

  findAll(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  findById(id: number): Promise<UserEntity> {
    return this.userRepository.findOne({ id });
  }

  async findByLogin(login: string): Promise<UserEntity> {
    const response = await this.userRepository.findOne({ username: login });

    if (response) {
      return response;
    }

    return this.userRepository.findOne({ email: login });
  }
}
