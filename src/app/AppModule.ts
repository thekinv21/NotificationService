import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD, APP_PIPE } from '@nestjs/core';

import { ZodValidationPipe } from 'nestjs-zod';

import { EmailModule } from '@/infrastructure/email';

import { ApiKeyGuard } from '@/presentation/guard';

import { NotificationModule } from './NotificationModule';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    EmailModule,
    NotificationModule,
  ],
  controllers: [],
  providers: [
    { provide: APP_PIPE, useClass: ZodValidationPipe },
    { provide: APP_GUARD, useClass: ApiKeyGuard },
  ],
})
export class AppModule {}
