export const healthPaths = {
  health: {
    get: {
      tags: ['Health'],
      summary: 'Verifica se a API esta em execucao',
      responses: {
        200: {
          description: 'API em execucao',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  status: { type: 'string' },
                },
              },
            },
          },
        },
      },
    },
  },
};
