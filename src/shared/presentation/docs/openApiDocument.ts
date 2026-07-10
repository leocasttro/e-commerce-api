import { categoryPaths } from './paths/categoryPaths';
import { healthPaths } from './paths/healthPaths';
import { productPaths } from './paths/productPaths';

export const openApiDocument = {
  openapi: '3.0.0',
  info: {
    title: 'Ecommerce API',
    version: '1.0.0',
    description: 'API REST para gerenciamento de produtos e categorias.',
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Ambiente local',
    },
  ],
  tags: [{ name: 'Health' }, { name: 'Categories' }, { name: 'Products' }],
  paths: {
    ...healthPaths,
    ...categoryPaths,
    ...productPaths,
  },
  components: {
    schemas: {
      ErrorResponse: {
        type: 'object',
        properties: {
          error: {
            type: 'object',
            properties: {
              message: { type: 'string' },
            },
          },
        },
      },
      Category: {
        type: 'object',
        properties: {
          id: { type: 'string', format: 'uuid' },
          name: { type: 'string' },
          createdAt: { type: 'string', format: 'date-time' },
          updatedAt: { type: 'string', format: 'date-time' },
        },
      },
      Product: {
        type: 'object',
        properties: {
          id: { type: 'string', format: 'uuid' },
          name: { type: 'string' },
          description: { type: 'string', nullable: true },
          price: { type: 'number' },
          stock: { type: 'integer' },
          categoryId: { type: 'string', format: 'uuid' },
          createdAt: { type: 'string', format: 'date-time' },
          updatedAt: { type: 'string', format: 'date-time' },
        },
      },
    },
  },
};
