import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  private access_token_secret_key: string = process.env.ACCESS_TOKEN_SECRET_KEY;

  private async getToken(payload: any, expiresIn: any) {
    return jwt.sign(payload, this.access_token_secret_key, {
      expiresIn,
    });
  }

  async signAccessToken(username: string) {
    const payload = { username };
    return this.getToken(payload, '3d');
  }
}
