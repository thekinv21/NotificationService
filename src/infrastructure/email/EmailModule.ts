import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { ResendModule } from 'nestjs-resend';

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
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule {}
