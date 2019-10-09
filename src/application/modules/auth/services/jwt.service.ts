import { Injectable } from '@nestjs/common';
import { sign, decode, verify } from 'jsonwebtoken';

@Injectable()
export class JwtService {
  async sign(payload, secret, options) {
    try {
      return await sign(payload, secret, options);
    } catch (error) {
      throw new Error(error);
    }
  }

  async verify(token: string, secret: string) {
    try {
      return await verify(token, secret);
    } catch (error) {
      throw new Error(error);
    }
  }

  async decode(token: string) {
    try {
      return await decode(token);
    } catch (error) {
      throw new Error(error);
    }
  }
}
