import { Module } from '@nestjs/common';

import { NotificationController } from '@/presentation/controller/NotificationController';

import { SendEmailUseCase } from '@/use-case/notification';

@Module({
  imports: [],
  controllers: [NotificationController],
  providers: [SendEmailUseCase],
})
export class NotificationModule {}
