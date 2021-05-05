import { IsEnum } from 'class-validator';
import { PermissionEnum } from '../permission.enum';

export class PermissionDTO {
  @IsEnum(PermissionEnum)
  name: PermissionEnum;
}
