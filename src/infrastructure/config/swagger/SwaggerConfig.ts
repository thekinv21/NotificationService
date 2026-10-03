import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('Resend Notification API')
  .setDescription(
    'A backend notification service built with **NestJS** and **Resend** for sending reliable transactional emails',
  )
  .setVersion('1.0')
  .setContact('Vadim', 'https://github.com/thekinv21', 'thekinv21@gmail.com')
  .addServer('http://localhost:4200', 'Local Development')
  .build();
