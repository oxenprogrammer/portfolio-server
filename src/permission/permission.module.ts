import { CommonModule } from 'src/common/common.module';
import { Module } from '@nestjs/common';
import { Permission } from './permission.entity';
import { PermissionController } from './permission.controller';
import { PermissionService } from './permission.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Permission]), CommonModule],
  providers: [PermissionService],
  controllers: [PermissionController]
})
export class PermissionModule {}
