import * as dotenv from 'dotenv';

import { Module, forwardRef } from '@nestjs/common';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { CommonModule } from 'src/common/common.module';
import { UserModule } from 'src/user/user.module';

dotenv.config();
@Module({
  imports: [CommonModule, forwardRef(() => UserModule)],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
