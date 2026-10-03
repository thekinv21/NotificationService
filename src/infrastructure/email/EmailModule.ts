import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';

import { ResendModule } from 'nestjs-resend';

import { ApiKeyGuard } from '@/shared';

import { EmailService } from './EmailService';

@Global()
@Module({
  imports: [
    ResendModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        apiKey: config.getOrThrow<string>('RESEND_API_KEY'),
      }),
    }),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ApiKeyGuard,
    },
    EmailService,
  ],
  exports: [EmailService],
})
export class EmailModule {}
