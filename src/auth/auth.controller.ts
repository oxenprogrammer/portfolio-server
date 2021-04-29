import {
  BadGatewayException,
  BadRequestException,
  Body,
  Controller,
  NotFoundException,
  Post,
} from '@nestjs/common';
import { User } from 'src/user/models/user.entity';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcryptjs';
import { RegisterDTO } from './model/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private userService: UserService) {}

  @Post('register')
  async register(@Body() body: RegisterDTO): Promise<User> {
    try {
      const { password, password_confirmation } = body;

      if (password != password_confirmation) {
        throw new BadRequestException('Passwords do not much');
      }

      const hashed_password = await bcrypt.hash(password, 10);
      return await this.userService.create({
        ...body,
        password: hashed_password,
      });
    } catch (error) {
      throw new BadGatewayException(error);
    }
  }

  @Post('login')
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
  ): Promise<User> {
    try {
      const user = await this.userService.findOne({ email });

      if (!user) {
        throw new NotFoundException('Email or Password is wrong');
      }

      if (!(await bcrypt.compare(password, user.password))) {
        throw new BadRequestException('Email or Password is wrong');
      }

      return user;
    } catch (error) {
      throw new BadGatewayException(error);
    }
  }
}
