import { ExtractJwt,Strategy } from "passport-jwt";
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
  constructor(){

    super({
      jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration:false,
      secretOrKey:'2e32ejwodndcn3431wd'
    })
  }
  async validate(payload:any){
    return {id:payload.sub,email:payload.email}
  }
}