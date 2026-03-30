import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Card } from './card.entity';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';

@Injectable()
export class CardsService {
  constructor(
    @InjectRepository(Card)
    private cardsRepository: Repository<Card>,
    private usersService: UsersService,
  ) {}

  async findAll(): Promise<Card[]> {
    const cards = await this.cardsRepository.find({
      relations: ['owner', 'likes'],
    });

    return cards;
  }

  async create(name: string, link: string): Promise<Card> {
    const user = await this.usersService.getMe();
    if (!user) throw new Error('User not found');

    return this.cardsRepository.save({
      name: name,
      link: link,
      owner: user,
      likes: [],
    });
  }

  async delete(cardId: string): Promise<{ message: string }> {
    await this.cardsRepository.delete({ _id: cardId });
    return { message: 'Пост удалён' };
  }

  async addLike(cardId: string): Promise<Card> {
    const card = await this.cardsRepository.findOne({
      where: { _id: cardId },
      relations: ['owner', 'likes'],
    });

    if (!card) throw new Error('Card not found');

    const user = await this.usersService.getMe();
    if (!user) throw new Error('User not found');

    card.likes.push(user);

    return this.cardsRepository.save(card);
  }

  async removeLike(cardId: string): Promise<Card> {
    const card = await this.cardsRepository.findOne({
      where: { _id: cardId },
      relations: ['owner', 'likes'],
    });

    if (!card) throw new Error('Card not found');

    const user = await this.usersService.getMe();
    if (!user) throw new Error('User not found');

    card.likes = card.likes.filter((v) => v._id !== user._id);

    return this.cardsRepository.save(card);
  }
}
