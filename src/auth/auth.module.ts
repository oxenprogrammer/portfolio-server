import * as dotenv from 'dotenv';

import { AuthController } from './auth.controller';
import { CommonModule } from 'src/common/common.module';
import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';

dotenv.config();
@Module({
  imports: [CommonModule, UserModule],
  controllers: [AuthController],
})
export class AuthModule {}
