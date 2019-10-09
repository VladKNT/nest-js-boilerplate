import { Injectable } from '@nestjs/common';
import { JwtService } from './jwt.service';
import { tokenConfig } from '../../../../resources/config/tokenConfig';

@Injectable()
export class TokenService {
  constructor(private readonly jwtService: JwtService) {}

  async createToken(user, config) {
    try {
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
    } catch (error) {
      throw new Error(error);
    }
  }

  async generateTokenPair(user) {
    const accessToken = await this.createToken(user, tokenConfig.access);
    const refreshToken = await this.createToken(user, tokenConfig.refresh);

    return { accessToken, refreshToken };
  }
}
