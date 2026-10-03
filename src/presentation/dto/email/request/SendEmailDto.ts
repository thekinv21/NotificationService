import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

const Email = z.email().trim().toLowerCase();

const SendEmailSchema = z
  .strictObject({
    to: z.union([Email, z.array(Email).min(1).max(50)]),
    subject: z.string().min(1).max(200),
    text: z.string().min(1).optional(),
    html: z.string().min(1).optional(),
  })
  .refine((body) => body.text !== undefined || body.html !== undefined, {
    message: 'Either text or html is required',
    path: ['text'],
  });

export class SendEmailDto extends createZodDto(SendEmailSchema) {}
