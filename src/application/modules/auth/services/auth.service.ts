import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RefreshToken } from '../../../database/models/refresh-token.entity';
import { JwtService } from './jwt.service';
import { TokenService } from './token.service';
import { UsersService } from '../../users/services/users.service';
import { User } from '../../../database/models/user.entity';
import { Password } from '../../../../lib/password/password';
import { tokenConfig } from '../../../../resources/config/tokenConfig';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(RefreshToken)
    private readonly refreshTokenRepository: Repository<RefreshToken>,
    private readonly jwtService: JwtService,
    private readonly tokenService: TokenService,
    private readonly usersService: UsersService,
  ) {}

  async validateUser(login: string, password: string): Promise<any> {
    const user = await this.usersService.findByLogin(login);

    if (user && await Password.comparePassword(password, user.password)) {
      return user;
    }

    return null;
  }

  async login(user: User) {
    const tokenPair = await this.tokenService.generateTokenPair(user);
    const refreshToken = Object.assign(new RefreshToken(), { token: tokenPair.refreshToken, user });
    await this.refreshTokenRepository.save(refreshToken);

    return tokenPair;
  }

  async refreshToken(token: string) {
    const { secret, type } = tokenConfig.refresh;
    const decodedToken: any = await this.jwtService.decode(token);
    const currentDate = new Date();

    const { sub: id, exp, tokenType } = decodedToken;

    if (exp < currentDate.getTime() / 1000) {
      await this.refreshTokenRepository.delete({ user: id });
      throw new Error('Token is expired.');
    }

    if (type !== tokenType) {
      await this.refreshTokenRepository.delete({ user: id });
      throw new Error('Invalid token type.');
    }

    await this.jwtService.verify(token, secret);
    const oldToken = await this.refreshTokenRepository.findOne({ token, user: id });

    if (!oldToken) {
      await this.refreshTokenRepository.delete({ user: id });
      throw new Error('Provided refresh token doesn\'t exist.');
    }

    const user: User = await this.usersService.findById(id);
    const tokenPair = await this.tokenService.generateTokenPair(user);
    const refreshToken = Object.assign(new RefreshToken(), { token: tokenPair.refreshToken, user });
    await this.refreshTokenRepository.update({ token, user: id }, refreshToken);

    return tokenPair;
  }
}
