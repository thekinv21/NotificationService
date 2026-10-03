import { Injectable } from '@nestjs/common';

import { GmailDto } from '@/presentation/dto/notification';

@Injectable()
export class GmailUseCase {
  async except(dto: GmailDto) {
    return dto;
  }
}
