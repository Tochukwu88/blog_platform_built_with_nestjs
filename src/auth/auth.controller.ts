import { Body, Controller, Get,Post,Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response,Request} from 'express';
import { User } from 'src/entities/user.entity';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import {JwtAuthGuard} from './jwt-auth.guard'




@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async createUser(@Res() res: Response, @Body() body:User):Promise<void>{
    let result = await this.authService.signUp(body)
     res.status(result.statusCode).send(result)

  }
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async loginUser(@Req() req: Request){
    return this.authService.login(req.user)

  }
  
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Req() req: Request){
    return req.user

  }
  

  
}
