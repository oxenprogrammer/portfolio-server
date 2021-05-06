import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { IsEnum } from 'class-validator';
import { PermissionEnum } from './permission.enum';

@Entity('permissions')
export class Permission {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', unique: true })
  @IsEnum(PermissionEnum)
  name: PermissionEnum;
}
