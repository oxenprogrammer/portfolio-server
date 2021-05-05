import { BadGatewayException, Controller, Get } from '@nestjs/common';

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
}
