import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import hashPassword from 'src/utils/auth/hashPassword';
import { Repository } from 'typeorm';
import { AuthCredentailsDto } from './dto/auth-credentials.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';

@Injectable()
export class AuthService {
  constructor(@InjectRepository(User) private repository: Repository<User>) {}

  async createUser(createUserDto: CreateUserDto): Promise<void> {
    const user = this.repository.create(createUserDto);
    try {
      user.password = hashPassword(user.password);
      await this.repository.save(user);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Username already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async signUp(createUserDto: CreateUserDto): Promise<void> {
    return this.createUser(createUserDto);
  }

  async signIn(authCredentialsDto: AuthCredentailsDto): Promise<string> {
    const { username, password } = authCredentialsDto;
    const user = await this.repository.findOneByOrFail({ username });
    if (user && (await bcrypt.compare(password, user.password))) {
      return 'success';
    } else {
      throw new UnauthorizedException('Unable to login');
    }
  }
}
