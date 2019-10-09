import {Controller, Request, Get, Post, UseGuards, Body} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  getUser(@Request() req) {
    return req.user;
  }

  @Post('refresh-token')
  refreshToken(@Body() refreshTokenDto: { token: string }) {
    return this.authService.refreshToken(refreshTokenDto.token);
  }
}
