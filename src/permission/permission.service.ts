import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PermissionDTO } from './model/permission.dto';
import { Permission } from './permission.entity';

@Injectable()
export class PermissionService {
  constructor(
    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>,
  ) {}

  async all(): Promise<Permission[]> {
    return await this.permissionRepository.find();
  }

  async create(data: PermissionDTO): Promise<Permission> {
    return await this.permissionRepository.save(data);
  }

  async delete(id: string): Promise<any> {
    return await this.permissionRepository.delete(id);
  }
}
