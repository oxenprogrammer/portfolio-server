import * as dotenv from 'dotenv';

import { Blog } from './../blog/models/blog.entity';
import { Module } from '@nestjs/common';
import { Permission } from './../permission/permission.entity';
import { Project } from './../project/models/project.entity';
import { Role } from './../role/role.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './../user/models/user.entity';

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
      entities: [User, Role, Permission, Project, Blog],
      synchronize: true,
    }),
  ],
})
export class DatabaseModule {}
