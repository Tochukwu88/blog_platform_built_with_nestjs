import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import {User} from '../entities/user.entity'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({usernameField:'email'});
  }

  async validate(email:string, password:string): Promise<any> {
    let userData={
      email,
      password
    }
    const user = await this.authService.signIn(userData);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}