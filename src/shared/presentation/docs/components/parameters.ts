export const parameters = {
  IdParam: {
    name: 'id',
    in: 'path',
    required: true,
    schema: { type: 'string', format: 'uuid' },
    example: '11111111-1111-1111-1111-111111111111',
  },
  PageParam: {
    name: 'page',
    in: 'query',
    required: false,
    schema: { type: 'integer', minimum: 1, default: 1 },
    example: 1,
  },
  LimitParam: {
    name: 'limit',
    in: 'query',
    required: false,
    schema: { type: 'integer', minimum: 1, maximum: 100, default: 10 },
    example: 10,
  },
};
