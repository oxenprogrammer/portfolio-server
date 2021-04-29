import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { User } from 'src/user/models/user.entity';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcryptjs';
import { RegisterDTO } from './model/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private userService: UserService) {}

  @Post('register')
  async register(@Body() body: RegisterDTO): Promise<User> {
    const { password, password_confirmation } = body;

    if (password != password_confirmation) {
      throw new BadRequestException('Passwords do not much');
    }

    const hashed_password = await bcrypt.hash(password, 10);
    return await this.userService.create({
      ...body,
      password: hashed_password,
    });
  }
}
