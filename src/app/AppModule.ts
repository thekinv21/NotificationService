import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { NotificationModule } from './NotificationModule';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    NotificationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
