import {
  BadGatewayException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { Role } from './role.entity';
import { RoleService } from './role.service';

@Controller('role')
export class RoleController {
  constructor(private roleService: RoleService) {}

  @Post()
  async create(
    @Body('name') name: string,
    @Body('permissions') perm_ids: string[],
  ): Promise<Role> {
    try {
      return await this.roleService.create({
        name,
        permissions: perm_ids.map((id) => ({ id })),
      });
    } catch (error) {
      throw new BadGatewayException(error);
    }
  }

  @Get()
  async all(): Promise<Role[]> {
    return await this.roleService.all();
  }

  @Get(':id')
  async get(@Param('id') id: string): Promise<Role> {
    return await this.roleService.findOne({ id });
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body('name') name: string,
    @Body('permissions') perm_ids: string[],
  ) {
    if (name) {
      await this.roleService.update(id, { name });
    }

    const role = await this.roleService.findOne({ id });
    return await this.roleService.create({
      ...role,
      permissions: perm_ids.map((id) => ({ id })),
    });
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Record<string, unknown>> {
    await this.roleService.delete(id);
    return { message: 'Role Deleted Successfully' };
  }
}
