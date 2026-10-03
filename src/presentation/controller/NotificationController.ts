import { Body, Controller, Post, Version } from '@nestjs/common';

import { SendEmailUseCase } from '@/use-case/notification';

import { SendEmailDto } from '../dto/email';

@Controller('/notification')
export class NotificationController {
  constructor(private readonly sendEmailUseCase: SendEmailUseCase) {}

  @Version('1')
  @Post('/email')
  async sendEmail(@Body() dto: SendEmailDto): Promise<void> {
    await this.sendEmailUseCase.execute(dto);
  }
}
