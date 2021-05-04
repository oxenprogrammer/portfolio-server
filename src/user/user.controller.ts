import {
  BadGatewayException,
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import { User } from './models/user.entity';
import { UserService } from './user.service';
import * as bcrypt from 'bcryptjs';
import { AuthGuard } from 'src/auth/auth.guard';
import { UserUpdateDTO } from './models/user-update.dto';
import { UserCreateDTO } from './models/user-create.dto';

@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(AuthGuard)
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async all(@Query('page') page = 1): Promise<User[]> {
    return await this.userService.paginate(page);
  }

  @Post()
  async create(@Body() body: UserCreateDTO): Promise<User> {
    const { role_id, email } = body;
    const hashed_password = await bcrypt.hash('1234', 10);
    try {
      const user = await this.userService.findOne({ email });

      if (user) {
        throw new HttpException('Conflict', HttpStatus.CONFLICT);
      }

      return await this.userService.create({
        ...body,
        password: hashed_password,
        role: { id: role_id },
      });
    } catch (error) {
      throw new BadGatewayException(error);
    }
  }

  @Get(':id')
  async get(@Param('id') id: string): Promise<User> {
    return await this.userService.findOne({ id });
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() body: any) {
    const { role_id } = body;
    await this.userService.update(id, {
      ...body,
      role: { id: role_id },
    });
    return await this.userService.findOne({ id });
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Record<string, unknown>> {
    await this.userService.delete(id);
    return { message: 'User Deleted Successfully' };
  }
}
