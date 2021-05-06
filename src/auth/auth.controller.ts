import {
  BadGatewayException,
  BadRequestException,
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  NotFoundException,
  Post,
  Req,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { User } from 'src/user/models/user.entity';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcryptjs';
import { RegisterDTO } from './model/register.dto';
import { JwtService } from '@nestjs/jwt';
import { Response, Request } from 'express';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('auth')
export class AuthController {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private authService: AuthService,
  ) {}

  @Post('register')
  async register(@Body() body: RegisterDTO): Promise<User> {
    try {
      const { email, password, password_confirmation } = body;

      if (password != password_confirmation) {
        throw new BadRequestException('Passwords do not much');
      }

      const user = await this.userService.findOne({ email });

      if (user) {
        throw new HttpException('Conflict', HttpStatus.CONFLICT);
      }

      const hashed_password = await bcrypt.hash(password, 10);
      return await this.userService.create({
        ...body,
        password: hashed_password,
        role: { id: 'eb7b038f-4606-4dbe-b1e2-0c94e7528e1c' },
      });
    } catch (error) {
      throw new BadGatewayException(error);
    }
  }

  @Post('login')
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
    @Res({ passthrough: true }) response: Response,
  ): Promise<User> {
    try {
      const user = await this.userService.findOne({ email });

      if (!user) {
        throw new NotFoundException('Email or Password is wrong');
      }

      if (!(await bcrypt.compare(password, user.password))) {
        throw new BadRequestException('Email or Password is wrong');
      }
      const jwt = await this.jwtService.signAsync({ id: user.id });
      response.cookie('jwt', jwt, { httpOnly: true });
      return user;
    } catch (error) {
      throw new BadGatewayException(error);
    }
  }

  @UseGuards(AuthGuard)
  @Get('user')
  async user(@Req() request: Request): Promise<User> {
    try {
      const id = await this.authService.userId(request);
      return this.userService.findOne({ id });
    } catch (error) {
      throw new BadGatewayException(error);
    }
  }

  @UseGuards(AuthGuard)
  @Post('logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('jwt');
    return { message: 'logout succcessful' };
  }
}
