import { Body, Controller, Get, Patch } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateAvatarDto } from './dto/update-avatar.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('me')
  getMe() {
    return this.usersService.getMe();
  }

  @Patch('me')
  updateMe(@Body() body: UpdateUserDto) {
    return this.usersService.updateMe(body.name, body.about);
  }

  @Patch('me/avatar')
  updateAvatar(@Body() body: UpdateAvatarDto) {
    return this.usersService.updateAvatar(body.avatar);
  }
}
