import { Injectable } from '@nestjs/common';

import { EmailService } from '@/infrastructure/email';

export interface SendEmailInput {
  to: string | string[];
  subject: string;
  text?: string;
  html?: string;
}

@Injectable()
export class SendEmailUseCase {
  constructor(private readonly emailService: EmailService) {}

  async execute(dto: SendEmailInput): Promise<void> {
    return this.emailService.send({
      to: Array.isArray(dto.to) ? dto.to : [dto.to],
      subject: dto.subject,
      text: dto.text,
      html: dto.html,
    });
  }
}
