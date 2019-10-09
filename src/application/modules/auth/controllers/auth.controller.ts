import {Controller, Request, Get, Post, UseGuards, Body} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../services/auth.service';
import { UsersService } from '../../users/services/users.service';
import { User } from '../../../database/models/user.entity';
import { TokenPairInterface } from '../interfaces/tokenPair.interface';
import { RefreshTokenDto } from '../dto/refreshToken.dto';
import {CreateUserDto} from '../../users/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req): Promise<TokenPairInterface> {
    return this.authService.login(req.user);
  }

  @Post('sign-up')
  async signUp(@Body() createUserDto: CreateUserDto): Promise<TokenPairInterface> {
    const user = await this.userService.create(createUserDto);
    return this.authService.login(user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  getUser(@Request() req): Promise<User> {
    return req.user;
  }

  @Post('refresh-token')
  refreshToken(@Body() refreshTokenDto: RefreshTokenDto): Promise<TokenPairInterface> {
    return this.authService.refreshToken(refreshTokenDto.token);
  }
}
