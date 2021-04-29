import { AuthController } from './auth.controller';
import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [UserModule],
  controllers: [AuthController],
})
export class AuthModule {}
