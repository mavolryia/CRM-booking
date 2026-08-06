import swaggerJSDoc from 'swagger-jsdoc';

const swaggerSpec = swaggerJSDoc({
  definition: {
    openapi: '3.0.3',
    info: {
      title: 'CRM Бронирование API',
      version: '1.0.0',
      description: 'REST API мини-CRM для бронирования встреч. Итерация 1.1: авторизация и роли.',
    },
    servers: [{ url: 'http://localhost:4000', description: 'Локальный сервер' }],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        User: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            email: { type: 'string', format: 'email', example: 'admin@example.com' },
            role: { type: 'string', enum: ['admin', 'manager'], example: 'admin' },
          },
        },
        AuthResponse: {
          type: 'object',
          properties: {
            token: { type: 'string', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' },
            user: { $ref: '#/components/schemas/User' },
          },
        },
        FieldErrors: {
          type: 'object',
          properties: {
            errors: {
              type: 'object',
              properties: {
                email: { type: 'string', example: 'Некорректный формат email' },
                password: { type: 'string', example: 'Пароль должен содержать минимум 8 символов' },
              },
            },
          },
        },
      },
    },
  },
  apis: ['./src/routes/*.js'],
});

export default swaggerSpec;
