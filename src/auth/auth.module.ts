import * as dotenv from 'dotenv';

import { Module, forwardRef } from '@nestjs/common';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { CommonModule } from './../common/common.module';
import { RoleModule } from './../role/role.module';
import { UserModule } from './../user/user.module';

dotenv.config();
@Module({
  imports: [
    CommonModule,
    forwardRef(() => UserModule),
    forwardRef(() => RoleModule),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
