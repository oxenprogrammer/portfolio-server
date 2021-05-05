import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './role.entity';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
  ) {}

  async all(): Promise<Role[]> {
    return this.roleRepository.find({});
  }

  async create(data): Promise<Role> {
    return await this.roleRepository.save(data);
  }

  async findOne(data): Promise<Role> {
    return await this.roleRepository.findOne(data, {
      relations: ['permissions'],
    });
  }

  async update(id: string, data): Promise<any> {
    return await this.roleRepository.update(id, data);
  }

  async delete(id: string): Promise<any> {
    return await this.roleRepository.delete(id);
  }
}
