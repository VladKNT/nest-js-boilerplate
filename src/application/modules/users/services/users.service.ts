import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../../database/models/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = Object.assign(new User(), createUserDto);
    return this.userRepository.save(user);
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findById(id: number): Promise<User> {
    return this.userRepository.findOne({ id });
  }

  async findByLogin(login: string): Promise<User> {
    const response = await this.userRepository.findOne({ username: login });

    if (response) {
      return response;
    }

    return this.userRepository.findOne({ email: login });
  }
}
