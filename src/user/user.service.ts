import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserUpdateDTO } from './models/user-update.dto';
import { User } from './models/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async all(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async create(data): Promise<User> {
    return await this.userRepository.save(data);
  }

  async findOne(data): Promise<User> {
    return await this.userRepository.findOne(data);
  }

  async update(id: string, data: UserUpdateDTO): Promise<any> {
    return await this.userRepository.update(id, data);
  }

  async delete(id: string): Promise<any> {
    return await this.userRepository.delete(id);
  }
}
