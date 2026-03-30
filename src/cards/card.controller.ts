import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CardsService } from './cards.service';
import { createCardDto } from './dto/create-card.dto';

@Controller('cards')
export class CardsController {
  constructor(private cardsService: CardsService) {}

  @Get()
  findAll() {
    return this.cardsService.findAll();
  }

  @Post()
  create(@Body() body: createCardDto) {
    return this.cardsService.create(body.name, body.link);
  }

  @Delete(':cardId')
  delete(@Param('cardId') cardId: string) {
    return this.cardsService.delete(cardId);
  }

  @Put('likes/:cardId')
  addLike(@Param('cardId') cardId: string) {
    return this.cardsService.addLike(cardId);
  }

  @Delete('likes/:cardId')
  removeLike(@Param('cardId') cardId: string) {
    return this.cardsService.removeLike(cardId);
  }
}
