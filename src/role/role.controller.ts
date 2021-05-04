import { Controller, Get } from '@nestjs/common';

import { Role } from './role.entity';
import { RoleService } from './role.service';

@Controller('role')
export class RoleController {
  constructor(private roleService: RoleService) {}
  @Get()
  async all(): Promise<Role[]> {
    return await this.roleService.all();
  }
}
