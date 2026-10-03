import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { ResendService } from 'nestjs-resend';

export interface IEmailMessage {
  to: string[];
  subject: string;
  text?: string;
  html?: string;
}

@Injectable()
export class EmailService {
  constructor(
    private readonly resend: ResendService,
    private readonly config: ConfigService,
  ) {}

  async send(message: IEmailMessage): Promise<void> {
    const from = this.config.getOrThrow<string>('EMAIL_FROM');
    const replyTo = this.config.get<string>('EMAIL_REPLY_TO');

    const { data, error } = await this.resend.send({
      from,
      to: message.to,
      subject: message.subject,
      text: message.text || undefined,
      html: message.html || undefined,
      replyTo: replyTo || undefined,
    } as Parameters<ResendService['send']>[0]);

    if (error || !data) {
      Logger.error(
        `Resend rejected email: ${error?.message}`,
        EmailService.name,
      );
      throw new BadRequestException('Failed to send email');
    }
  }
}
