import { Repository } from 'typeorm';
import User from './user.entity';
import { UsersRepository } from '../user/users.repository';
import { CreateUserDto } from './dto/user.dto';

export const CustomUserRepository: Pick<UsersRepository, any> = {
    findByParam(dataArr: object) {
        return this.findOneBy(dataArr);
    },
  
    createUser(user: CreateUserDto): Promise<User> {
        const newUser = this.create(user);

        return this.save(newUser);
    }
  };