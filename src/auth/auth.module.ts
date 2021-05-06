import * as dotenv from 'dotenv';

import { AuthController } from './auth.controller';
import { CommonModule } from 'src/common/common.module';
import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { AuthService } from './auth.service';

dotenv.config();
@Module({
  imports: [CommonModule, UserModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
