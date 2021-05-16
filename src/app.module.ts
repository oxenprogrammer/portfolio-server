import { AuthModule } from './auth/auth.module';
import { BlogModule } from './blog/blog.module';
import { CommonModule } from './common/common.module';
import { DatabaseModule } from './database/database.module';
import { Module } from '@nestjs/common';
import { PermissionModule } from './permission/permission.module';
import { ProjectModule } from './project/project.module';
import { RoleModule } from './role/role.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    UserModule,
    DatabaseModule,
    AuthModule,
    CommonModule,
    RoleModule,
    PermissionModule,
    ProjectModule,
    BlogModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
