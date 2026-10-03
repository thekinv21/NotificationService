import { Global, Module } from '@nestjs/common';

import { NotificationController } from '@/presentation/controller/NotificationController';

import { GmailUseCase } from '@/use-case/notification';

@Global()
@Module({
  imports: [],
  controllers: [NotificationController],
  providers: [GmailUseCase],
})
export class NotificationModule {}
