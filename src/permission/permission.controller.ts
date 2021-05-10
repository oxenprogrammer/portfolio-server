import {
  BadGatewayException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
} from '@nestjs/common';
import { PermissionDTO } from './model/permission.dto';

import { Permission } from './permission.entity';
import { PermissionService } from './permission.service';

@Controller('permission')
export class PermissionController {
  constructor(private permissionService: PermissionService) {}

  @Get()
  async all(): Promise<Permission[]> {
    try {
      return await this.permissionService.all();
    } catch (error) {
      throw new BadGatewayException(error);
    }
  }

  @Post()
  async create(@Body('name') name: PermissionDTO): Promise<any> {
    try {
      return await this.permissionService.create({ name });
    } catch (error) {
      throw new BadGatewayException(error);
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Record<string, unknown>> {
    await this.permissionService.delete(id);
    return { message: 'Permission Deleted Successfully' };
  }
}
