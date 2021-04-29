import { Body, Controller, Post } from '@nestjs/common';
import { User } from 'src/user/models/user.entity';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcryptjs';

@Controller('auth')
export class AuthController {
  constructor(private userService: UserService) {}

  @Post('register')
  async register(@Body() body): Promise<User> {
    const { password } = body;
    const hashed_password = await bcrypt.hash(password, 10);
    return await this.userService.create({
      ...body,
      password: hashed_password,
    });
  }
}
