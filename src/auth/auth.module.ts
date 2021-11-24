import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import {User} from '../entities/user.entity'
import{PassportModule} from '@nestjs/passport'
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';



@Module({
  imports: [TypeOrmModule.forFeature([User]),PassportModule,
JwtModule.register({
  secret:'2e32ejwodndcn3431wd',
  signOptions:{expiresIn:'1d'}
})  
],
  controllers: [AuthController],
  providers: [AuthService,LocalStrategy,JwtStrategy],
})
export class AuthModule {}
