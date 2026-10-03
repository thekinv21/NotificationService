# Notification Service

A scalable and modular backend service for managing and delivering application notifications, built with NestJS and Resend.

[![NestJS](https://img.shields.io/badge/NestJS-v11-blue)](https://nestjs.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-v6-blue)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-v26-green)](https://nodejs.org/)
[![Resend](https://img.shields.io/badge/Resend-v6-purple)](https://resend.com/)

## Description

The Notification Service is a robust backend application designed to handle the sending of application notifications, primarily focusing on email delivery. It leverages NestJS for a modular and scalable architecture, integrating with Resend for reliable email sending. The service is secured with an API key and configured to use environment variables for sensitive information and service settings.

## Features

- **Email Notification Delivery**: Efficiently sends transactional emails using the Resend API.
- **API Key Authentication**: Secures endpoints with API key authentication for controlled access.
- **Environment Configuration**: Manages configurations through `.env` files for flexibility.
- **Data Validation**: Utilizes `nestjs-zod` for robust request data validation.
- **Swagger Documentation**: Provides interactive API documentation via Swagger UI.
- **HTTP Security**: Implements `helmet` for basic HTTP security headers.
- **Versioning**: Supports API versioning (currently v1).

## Stack

- **Languages**: TypeScript
- **Frameworks**: NestJS, Express.js
- **Libraries**: Resend, Helmet, Zod, Reflect Metadata, RxJS
- **Development Tools**: Prettier, Husky, OXLint, ts-node, TypeScript

## Installation

### Prerequisites

- Node.js (v22 or higher recommended)
- npm or yarn
- Resend API Key
- A verified domain in Resend (see below)

> [!IMPORTANT]
> **Domain verification is required to send emails to arbitrary recipients.**
> Until you verify a domain in Resend, you can only send emails to your own account's email address (using the `onboarding@resend.dev` test sender). To send to any other address, you must:
>
> 1. Add your own domain in the [Resend Dashboard → Domains](https://resend.com/domains).
> 2. Add the DNS records Resend gives you (e.g. `TXT` for SPF/DKIM, `CNAME`, `MX`) at your domain registrar / DNS provider.
> 3. Wait until the domain status shows **Verified** in the Resend dashboard (DNS propagation can take from a few minutes up to 72 hours).
> 4. Set `EMAIL_FROM` in your `.env` to an address on that verified domain (e.g. `noreply@yourdomain.com`).
>
> Emails will only be delivered to other recipients once the domain is verified.

### Steps

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/thekinv21/NotificationService.git
    cd NotificationService
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Configure environment variables:**
    Create a `.env` file in the root of the project and add your Resend API key and other necessary details:

    ```env
    NODE_ENV=development
    PORT=4200

    EMAIL_FROM=your-email@example.com
    EMAIL_REPLY_TO=reply-to@example.com
    RESEND_API_KEY=re_your_resend_api_key
    API_KEY=your_application_api_key # This is used for ApiKeyGuard
    ```

    _Note: The `RESEND_API_KEY` is used for both Resend integration and API key authentication by default. You might want to use a different variable for the application's API key if needed._

4.  **Build the project:**
    ```bash
    npm run build
    ```

## Usage

This service provides an API endpoint to send emails. It is designed to be integrated into other applications that require sending notifications.

### Sending an Email

Send a POST request to the `/api/v1/notification/email` endpoint with a JSON body containing the email details. Ensure your request includes the `x-api-key` header with a valid API key.

**Request Body Example:**

```json
{
  "to": "recipient@example.com",
  "subject": "Test Email Subject",
  "text": "This is the plain text content of the email.",
  "html": "<p>This is the <strong>HTML</strong> content of the email.</p>"
}
```

**Example using `curl`:**

```bash
curl -X POST \
  http://localhost:4200/api/v1/notification/email \
  -H 'Content-Type: application/json' \
  -H 'x-api-key: your_application_api_key' \
  -d '{
    "to": "recipient@example.com",
    "subject": "Test Email Subject",
    "text": "This is the plain text content of the email."
  }'
```

### Development Server

To run the application in development mode with watch enabled:

```bash
npm run start:dev
```

### API Documentation

Access the interactive API documentation (Swagger UI) at `/docs` when running in development mode:

`http://localhost:4200/docs`

## API Reference

### `POST /api/v1/notification/email`

Sends an email notification

**Request Body:**

```typescript
{
  "to": "string | string[]",
  "subject": "string",
  "text?: "string",
  "html?: "string"
}
```

**Response:**

- `201 Created`: Email sent successfully.
- `400 Bad Request`: Invalid request payload or missing/invalid API key.
- `500 Internal Server Error`: Failed to send email due to an internal issue.

**Security:**

Requires `x-api-key` header with a valid API key.

## Contributing

Contributions are welcome! Please follow these steps:

1.  Fork the repository.
2.  Create a new branch for your feature (`git checkout -b feature/YourFeature`).
3.  Make your changes and commit them (`git commit -m 'Add some YourFeature'`).
4.  Push to the branch (`git push origin feature/YourFeature`).
5.  Open a Pull Request

- **Author**: [Vadim](https://github.com/thekinv21)
- **Resend**: [https://resend.com/](https://resend.com/)
- **NestJS**: [https://nestjs.com/](https://nestjs.com/)
