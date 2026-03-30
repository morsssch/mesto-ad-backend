import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from './auth/auth.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalGuards(new AuthGuard(app.get(ConfigService)));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
