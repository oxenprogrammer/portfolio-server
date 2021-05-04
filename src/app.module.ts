import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';
import { RoleModule } from './role/role.module';
import { PermissionModule } from './permission/permission.module';

@Module({
  imports: [UserModule, DatabaseModule, AuthModule, CommonModule, RoleModule, PermissionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
