import { ValidationError } from '../../domain/errors/ValidationError';
import { PaginationParams } from './PaginationParams';

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 10;
const MAX_LIMIT = 100;

export function normalizePagination(params: Partial<PaginationParams>): PaginationParams {
  const page = params.page ?? DEFAULT_PAGE;
  const limit = params.limit ?? DEFAULT_LIMIT;

  if (!Number.isInteger(page) || page < 1) {
    throw new ValidationError('A página deve ser um número inteiro maior ou igual a 1.');
  }

  if (!Number.isInteger(limit) || limit < 1) {
    throw new ValidationError('O limite deve ser um número inteiro maior ou igual a 1.');
  }

  return {
    page,
    limit: Math.min(limit, MAX_LIMIT),
  };
}
