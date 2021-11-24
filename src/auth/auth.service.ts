import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {User} from '../entities/user.entity'
import {IReturnObject} from '../types/IreturnObj'
import {Return} from '../utils/responses'
import { genSaltSync, hash, compare } from 'bcryptjs'
import {JwtService} from '@nestjs/jwt'


@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepo: Repository<User>,
    private jwtService:JwtService
  ) {}
async  signUp(userPayload:User): Promise<IReturnObject> {
    try{
     let user =  await this.usersRepo.find({where:{email:userPayload.email}})
     if(user.length>0){
       return Return({
         error:true,
         statusCode:400,
         errorMessage:'User with that email already exist'
       })
     }
     let newpsw = await this.generateHashedPassword(userPayload.password)
     let newuserPayload ={
       firstName:userPayload.firstName,
       lastName:userPayload.lastName,
       email:userPayload.email,
       password:newpsw
     }
     await this.usersRepo.insert(newuserPayload)
     return Return({
      error:false,
      statusCode:201,
      sucessMessage:'User created',
      
     })
   
    }catch(error){
      return Return({
        error:true,
        statusCode:500,
        errorMessage:'internal server error'
      })

    }
  }
  async  signIn(userPayload:any): Promise<any>{
    let user =  await this.usersRepo.find({where:{email:userPayload.email}})
     if(user.length<0){
       return null
     }
     const passwordMatch = compare(userPayload.password, user[0].password);
     if(!passwordMatch){
      return null

     }
     const {password, ...result} = user[0]

     return result
  }
  async login(user:any){
    const payload = {email:user.email,sub:user.id}
    return{
      access_token:this.jwtService.sign(payload)
    }
  }
  public async generateHashedPassword(password: string): Promise<string> {
    const salt = genSaltSync(10);
    const hashedPassword = await hash(password, salt);
    return hashedPassword;
}
}
