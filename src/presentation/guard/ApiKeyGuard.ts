import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import type { Request } from 'express';
import { timingSafeEqual } from 'node:crypto';

export const API_KEY_HEADER = 'x-api-key';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  private readonly apiKey: Buffer;

  constructor(config: ConfigService) {
    this.apiKey = Buffer.from(config.getOrThrow<string>('RESEND_API_KEY'));
  }

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const provided = request.header(API_KEY_HEADER);

    if (!provided || !this.isValid(provided)) {
      throw new UnauthorizedException('Invalid or missing API key');
    }

    return true;
  }

  private isValid(provided: string): boolean {
    const candidate = Buffer.from(provided);

    return (
      candidate.length === this.apiKey.length &&
      timingSafeEqual(candidate, this.apiKey)
    );
  }
}
