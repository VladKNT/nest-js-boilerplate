import { Injectable } from '@nestjs/common';
import { sign, decode, verify } from 'jsonwebtoken';

@Injectable()
export class JwtService {
  async sign(payload, secret, options): Promise<string> {
    return sign(payload, secret, options);
  }

  async verify(token: string, secret: string): Promise<object | string> {
    return verify(token, secret);
  }

  async decode(token: string): Promise<null | { [key: string]: any } | string> {
    return decode(token);
  }
}
