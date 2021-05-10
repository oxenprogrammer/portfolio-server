import * as dotenv from 'dotenv';

import { Module } from '@nestjs/common';
import { Permission } from 'src/permission/permission.entity';
import { Project } from 'src/project/models/project.entity';
import { Role } from 'src/role/role.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/models/user.entity';

dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'postgres',
      port: 5432,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE_NAME,
      entities: [User, Role, Permission, Project],
      synchronize: true,
    }),
  ],
})
export class DatabaseModule {}
