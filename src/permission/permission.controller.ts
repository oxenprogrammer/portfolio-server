import {
  BadGatewayException,
  Body,
  Controller,
  Get,
  Post,
} from '@nestjs/common';
import { PermissionDTO } from './model/permission.dto';

import { Permission } from './permission.entity';
import { PermissionEnum } from './permission.enum';
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
  async create(@Body('name') name: PermissionEnum): Promise<any> {
    try {
      return await this.permissionService.create({ name });
    } catch (error) {
      throw new BadGatewayException(error);
    }
  }
}
