import { Module } from '@nestjs/common';
import { Card } from './card.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CardsService } from './cards.service';
import { UsersModule } from '../users/users.module';
import { CardsController } from './card.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Card]), UsersModule],
  providers: [CardsService],
  controllers: [CardsController],
})
export class CardsModule {}
