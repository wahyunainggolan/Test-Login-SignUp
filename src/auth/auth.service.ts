import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import User from '../user/user.entity';
import * as bcrypt from 'bcryptjs';
import { UsersRepository } from '../user/users.repository';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { randomUUID } from 'crypto';
import { ConfigService } from '@nestjs/config';
import { RedisService } from './redis/redis.service';

@Injectable()
export class AuthService {
  
  constructor(
    @InjectRepository(User)
    private readonly userRepository: UsersRepository,
    private jwtService: JwtService,
    private readonly redisService: RedisService,
    private readonly configService: ConfigService
  ) {}

  async signUp(signUpDto: SignUpDto) {
    const { name, username, password } = signUpDto;
    const hashedPassword = await bcrypt.hash(password, 10);
    let checkByName = await this.userRepository.findByParam({'name' : name})

    if (checkByName) {
      throw new UnauthorizedException('Name already exists');
    }

    let checkByUsername = await this.userRepository.findByParam({'username' : username})

    if (checkByUsername) {
      throw new UnauthorizedException('Username already exists');
    }

    const user = await this.userRepository.createUser({
      name,
      username,
      password: hashedPassword,
    });

    const token = this.jwtService.sign({ id: user.id});
    const key = randomUUID();
    
    this.redisService.client.set(username, JSON.stringify({ key }), {
      EX: this.configService.get<number>('redisJwtExpiration'),
    })

    return {
      'id' : user.id,
      'token' : token
    };
  }

  async login(loginDto: LoginDto) {
    const { username, password } = loginDto;

    const user = await this.userRepository.findByParam({'username' : username});

    if (!user) {
      throw new UnauthorizedException('Invalid username or password');
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched) {
      throw new UnauthorizedException('Invalid username or password');
    }

    const token = this.jwtService.sign({ id: user.id });
    const key = randomUUID();
    this.redisService.client.set(username, JSON.stringify({ key }), {
      EX: this.configService.get<number>('redisJwtExpiration'),
    })

    return {
      'id' : user.id,
      'token' : token
    };
  }

  async logout(username: string) {
    const userToken = await this.redisService.client.get(username);

    if (!userToken) return;

    await this.redisService.client.del(username);
  }
}