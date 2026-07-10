export const productPaths = {
  '/products': {
    post: {
      tags: ['Products'],
      summary: 'Cria um produto',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/CreateProductRequest' },
          },
        },
      },
      responses: {
        201: {
          description: 'Produto criado',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Product' },
            },
          },
        },
        400: { $ref: '#/components/responses/BadRequest' },
        404: { $ref: '#/components/responses/NotFound' },
      },
    },
    get: {
      tags: ['Products'],
      summary: 'Lista produtos com paginacao e filtros',
      parameters: [
        { $ref: '#/components/parameters/PageParam' },
        { $ref: '#/components/parameters/LimitParam' },
        {
          name: 'categoryId',
          in: 'query',
          required: false,
          schema: { type: 'string', format: 'uuid' },
          description: 'Filtra produtos por categoria',
        },
        {
          name: 'priceMin',
          in: 'query',
          required: false,
          schema: { type: 'number' },
          description: 'Preco minimo',
        },
        {
          name: 'priceMax',
          in: 'query',
          required: false,
          schema: { type: 'number' },
          description: 'Preco maximo',
        },
        {
          name: 'name',
          in: 'query',
          required: false,
          schema: { type: 'string' },
          description: 'Busca parcial por nome, case-insensitive',
        },
      ],
      responses: {
        200: {
          description: 'Lista paginada de produtos',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/PaginatedProducts' },
            },
          },
        },
        400: { $ref: '#/components/responses/BadRequest' },
      },
    },
  },
  '/products/{id}': {
    get: {
      tags: ['Products'],
      summary: 'Busca um produto por ID',
      description: 'Retorna tambem os dados da categoria vinculada.',
      parameters: [{ $ref: '#/components/parameters/IdParam' }],
      responses: {
        200: {
          description: 'Produto encontrado',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/ProductWithCategory' },
            },
          },
        },
        404: { $ref: '#/components/responses/NotFound' },
      },
    },
    put: {
      tags: ['Products'],
      summary: 'Atualiza um produto',
      parameters: [{ $ref: '#/components/parameters/IdParam' }],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/UpdateProductRequest' },
          },
        },
      },
      responses: {
        200: {
          description: 'Produto atualizado',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Product' },
            },
          },
        },
        400: { $ref: '#/components/responses/BadRequest' },
        404: { $ref: '#/components/responses/NotFound' },
      },
    },
    delete: {
      tags: ['Products'],
      summary: 'Exclui um produto',
      parameters: [{ $ref: '#/components/parameters/IdParam' }],
      responses: {
        204: {
          description: 'Produto excluido',
        },
        404: { $ref: '#/components/responses/NotFound' },
      },
    },
  },
};
