import { Body, Controller, Post, Version } from '@nestjs/common';

import { GmailUseCase } from '@/use-case/notification';

import { GmailDto } from '../dto/notification/request';

@Controller('/notification')
export class NotificationController {
  constructor(private readonly gmailUseCase: GmailUseCase) {}

  /**
   *
   * @param dto GmailDto
   * @description Send gmail notification
   */

  @Version('1')
  @Post('/gmail')
  async sendGmail(@Body() dto: GmailDto) {
    return this.gmailUseCase.except(dto);
  }
}
