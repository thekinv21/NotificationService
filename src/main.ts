import { VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';

import { AppModule } from '@/app/AppModule';

import { swaggerConfig } from '@/infrastructure/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('/api');

  app.enableVersioning({
    type: VersioningType.URI,
  });

  SwaggerModule.setup(
    '/docs',
    app,
    SwaggerModule.createDocument(app, swaggerConfig),
  );

  await app.listen(process.env.PORT ?? 4200);
}
void bootstrap();
