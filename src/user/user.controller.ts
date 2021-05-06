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
  Put,
  Query,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import { User } from './models/user.entity';
import { UserService } from './user.service';
import * as bcrypt from 'bcryptjs';
import { AuthGuard } from 'src/auth/auth.guard';
import { UserCreateDTO } from './models/user-create.dto';
import { Request } from 'express';
import { UserUpdateDTO } from './models/user-update.dto';
import { AuthService } from 'src/auth/auth.service';

@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(AuthGuard)
@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @Get()
  async all(@Query('page') page = 1) {
    return await this.userService.paginate(page, ['role']);
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
    return await this.userService.findOne({ id }, ['role']);
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

  @Put('info')
  async updateInfo(@Req() request: Request, @Body() body: UserUpdateDTO) {
    const id = await this.authService.userId(request);
    await this.userService.update(id, body);
    return await this.userService.findOne({ id });
  }
}
