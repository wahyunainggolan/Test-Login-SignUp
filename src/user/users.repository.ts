import { Repository } from 'typeorm';
import User from './user.entity';

export interface UsersRepository extends Repository<User> {
  this: Repository<User>;
  
  findByParam(dataArr: object);
  getUser(id: number): Promise<User>;
  createUser(user: { name: string; username: string; password: string });
}