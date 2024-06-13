import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import User from '../user/user.entity';
import * as bcrypt from 'bcryptjs';
import { UsersService } from '../user/users.service';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignUpDto) {
    const { name, username, password } = signUpDto;
    const hashedPassword = await bcrypt.hash(password, 10);
    let checkByName = await this.usersRepository.exists({ where: {'name' : name} })

    if (checkByName) {
      throw new UnauthorizedException('Name already exists');
    }

    let checkByUsername = await this.usersRepository.exists({ where: {'username' : username} })

    if (checkByUsername) {
      throw new UnauthorizedException('Username already exists');
    }

    const user = await this.usersRepository.create({
      name,
      username,
      password: hashedPassword,
    });

    await this.usersRepository.save(user);

    const token = this.jwtService.sign({ id: user.id});

    return {
      'id' : user.id,
      'token' : token
    };
  }

  async login(loginDto: LoginDto) {
    const { username, password } = loginDto;

    const user = await this.usersRepository.findOne({
      where: { username },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid username or password');
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched) {
      throw new UnauthorizedException('Invalid username or password');
    }

    const token = this.jwtService.sign({ id: user.id });

    return {
      'id' : user.id,
      'token' : token
    };
  }
}