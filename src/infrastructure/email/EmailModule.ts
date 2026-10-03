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
        apiKey: config.get<string>('RESEND_API_KEY') || 'unset',
      }),
    }),
  ],
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule {}
