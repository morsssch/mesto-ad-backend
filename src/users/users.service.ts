import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsersService implements OnModuleInit {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private config: ConfigService,
  ) {}

  async onModuleInit() {
    const res = await this.getMe();
    if (res === null) {
      await this.usersRepository.save({
        name: this.config.get<string>('USER_NAME'),
        about: this.config.get<string>('USER_ABOUT'),
        avatar: this.config.get<string>('USER_AVATAR'),
        cohort: this.config.get<string>('USER_COHORT'),
      });
    }
  }

  async getMe(): Promise<User | null> {
    return this.usersRepository.findOne({
      where: { cohort: this.config.get('USER_COHORT') },
    });
  }

  async updateMe(name: string, about: string): Promise<User> {
    const user = await this.getMe();
    if (!user) throw new Error('User not found');
    user.name = name;
    user.about = about;
    return this.usersRepository.save(user);
  }

  async updateAvatar(avatar: string): Promise<User> {
    const user = await this.getMe();
    if (!user) throw new Error('User not found');
    user.avatar = avatar;
    return this.usersRepository.save(user);
  }
}
