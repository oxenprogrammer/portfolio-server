import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async userId(request: Request): Promise<string> {
    const cookie = await request.cookies['jwt'];
    const data = await this.jwtService.verifyAsync(cookie);
    return data['id'];
  }
}
