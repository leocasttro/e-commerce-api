export const categoryPaths = {
  '/categories': {
    post: {
      tags: ['Categories'],
      summary: 'Cria uma categoria',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/CreateCategoryRequest' },
          },
        },
      },
      responses: {
        201: {
          description: 'Categoria criada',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Category' },
            },
          },
        },
        400: { $ref: '#/components/responses/BadRequest' },
        409: { $ref: '#/components/responses/Conflict' },
      },
    },
    get: {
      tags: ['Categories'],
      summary: 'Lista categorias com paginacao',
      parameters: [
        { $ref: '#/components/parameters/PageParam' },
        { $ref: '#/components/parameters/LimitParam' },
      ],
      responses: {
        200: {
          description: 'Lista paginada de categorias',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/PaginatedCategories' },
            },
          },
        },
        400: { $ref: '#/components/responses/BadRequest' },
      },
    },
  },
  '/categories/{id}': {
    get: {
      tags: ['Categories'],
      summary: 'Busca uma categoria por ID',
      parameters: [{ $ref: '#/components/parameters/IdParam' }],
      responses: {
        200: {
          description: 'Categoria encontrada',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Category' },
            },
          },
        },
        404: { $ref: '#/components/responses/NotFound' },
      },
    },
    put: {
      tags: ['Categories'],
      summary: 'Atualiza uma categoria',
      parameters: [{ $ref: '#/components/parameters/IdParam' }],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/UpdateCategoryRequest' },
          },
        },
      },
      responses: {
        200: {
          description: 'Categoria atualizada',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Category' },
            },
          },
        },
        400: { $ref: '#/components/responses/BadRequest' },
        404: { $ref: '#/components/responses/NotFound' },
        409: { $ref: '#/components/responses/Conflict' },
      },
    },
    delete: {
      tags: ['Categories'],
      summary: 'Exclui uma categoria',
      description: 'Nao permite excluir categorias com produtos vinculados.',
      parameters: [{ $ref: '#/components/parameters/IdParam' }],
      responses: {
        204: {
          description: 'Categoria excluida',
        },
        404: { $ref: '#/components/responses/NotFound' },
        409: { $ref: '#/components/responses/Conflict' },
      },
    },
  },
};
