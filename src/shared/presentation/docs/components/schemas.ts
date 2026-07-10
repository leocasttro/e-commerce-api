export const schemas = {
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
    example: {
      id: '11111111-1111-1111-1111-111111111111',
      name: 'Eletronicos',
      createdAt: '2026-07-10T12:00:00.000Z',
      updatedAt: '2026-07-10T12:00:00.000Z',
    },
  },
  CreateCategoryRequest: {
    type: 'object',
    required: ['name'],
    properties: {
      name: { type: 'string' },
    },
    example: {
      name: 'Eletronicos',
    },
  },
  UpdateCategoryRequest: {
    type: 'object',
    required: ['name'],
    properties: {
      name: { type: 'string' },
    },
    example: {
      name: 'Informatica',
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
    example: {
      id: '22222222-2222-2222-2222-222222222222',
      name: 'Notebook Dell',
      description: 'Notebook para trabalho',
      price: 3500,
      stock: 5,
      categoryId: '11111111-1111-1111-1111-111111111111',
      createdAt: '2026-07-10T12:00:00.000Z',
      updatedAt: '2026-07-10T12:00:00.000Z',
    },
  },
  ProductWithCategory: {
    allOf: [
      { $ref: '#/components/schemas/Product' },
      {
        type: 'object',
        properties: {
          category: { $ref: '#/components/schemas/Category' },
        },
      },
    ],
    example: {
      id: '22222222-2222-2222-2222-222222222222',
      name: 'Notebook Dell',
      description: 'Notebook para trabalho',
      price: 3500,
      stock: 5,
      categoryId: '11111111-1111-1111-1111-111111111111',
      createdAt: '2026-07-10T12:00:00.000Z',
      updatedAt: '2026-07-10T12:00:00.000Z',
      category: {
        id: '11111111-1111-1111-1111-111111111111',
        name: 'Eletronicos',
        createdAt: '2026-07-10T12:00:00.000Z',
        updatedAt: '2026-07-10T12:00:00.000Z',
      },
    },
  },
  CreateProductRequest: {
    type: 'object',
    required: ['name', 'price', 'stock', 'categoryId'],
    properties: {
      name: { type: 'string' },
      description: { type: 'string', nullable: true },
      price: { type: 'number' },
      stock: { type: 'integer' },
      categoryId: { type: 'string', format: 'uuid' },
    },
    example: {
      name: 'Notebook Dell',
      description: 'Notebook para trabalho',
      price: 3500,
      stock: 5,
      categoryId: '11111111-1111-1111-1111-111111111111',
    },
  },
  UpdateProductRequest: {
    type: 'object',
    properties: {
      name: { type: 'string' },
      description: { type: 'string', nullable: true },
      price: { type: 'number' },
      stock: { type: 'integer' },
      categoryId: { type: 'string', format: 'uuid' },
    },
    example: {
      name: 'Notebook Dell Pro',
      description: 'Notebook atualizado',
      price: 4200,
      stock: 3,
      categoryId: '11111111-1111-1111-1111-111111111111',
    },
  },
  PaginationMeta: {
    type: 'object',
    properties: {
      page: { type: 'integer' },
      limit: { type: 'integer' },
      total: { type: 'integer' },
      totalPages: { type: 'integer' },
    },
  },
  PaginatedCategories: {
    type: 'object',
    properties: {
      data: {
        type: 'array',
        items: { $ref: '#/components/schemas/Category' },
      },
      meta: { $ref: '#/components/schemas/PaginationMeta' },
    },
  },
  PaginatedProducts: {
    type: 'object',
    properties: {
      data: {
        type: 'array',
        items: { $ref: '#/components/schemas/Product' },
      },
      meta: { $ref: '#/components/schemas/PaginationMeta' },
    },
  },
};
