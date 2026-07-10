import { parameters } from './components/parameters';
import { responses } from './components/responses';
import { schemas } from './components/schemas';
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
    parameters,
    responses,
    schemas,
  },
};
