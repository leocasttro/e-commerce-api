export const responses = {
  BadRequest: {
    description: 'Requisicao invalida',
    content: {
      'application/json': {
        schema: { $ref: '#/components/schemas/ErrorResponse' },
        example: {
          error: {
            message: 'O nome da categoria e obrigatorio.',
          },
        },
      },
    },
  },
  NotFound: {
    description: 'Recurso nao encontrado',
    content: {
      'application/json': {
        schema: { $ref: '#/components/schemas/ErrorResponse' },
        example: {
          error: {
            message: 'Recurso nao encontrado.',
          },
        },
      },
    },
  },
  Conflict: {
    description: 'Conflito de regra de negocio',
    content: {
      'application/json': {
        schema: { $ref: '#/components/schemas/ErrorResponse' },
        example: {
          error: {
            message: 'Ja existe uma categoria com este nome.',
          },
        },
      },
    },
  },
};
