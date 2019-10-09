import { Injectable } from '@nestjs/common';
import { JwtService } from './jwt.service';
import { tokenConfig } from '../../../../resources/config/tokenConfig';
import { TokenPairInterface } from '../interfaces/tokenPair.interface';

@Injectable()
export class TokenService {
  constructor(private readonly jwtService: JwtService) {}

  async createToken(user, config): Promise<string> {
    const { id, username } = user;
    const { type, expiresIn, secret } = config;

    const payload = {
      sub: id,
      username,
      tokenType: type,
    };

    const options = {
      algorithm: 'HS512',
      expiresIn,
    };

    return await this.jwtService.sign(payload, secret, options);
  }

  async generateTokenPair(user): Promise<TokenPairInterface> {
    const accessToken = await this.createToken(user, tokenConfig.access);
    const refreshToken = await this.createToken(user, tokenConfig.refresh);

    return { accessToken, refreshToken };
  }
}
