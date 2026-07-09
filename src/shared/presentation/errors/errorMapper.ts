import { DomainError } from '../../domain/errors/DomainError';
import { ValidationError } from '../../domain/errors/ValidationError';
import { HttpError } from './HttpError';
import { CategoryNotFoundError } from '../../../modules/catalog/domain/errors/CategoryNotFoundError';
import { ProductNotFoundError } from '../../../modules/catalog/domain/errors/ProductNotFoundError';
import { CategoryAlreadyExistsError } from '../../../modules/catalog/domain/errors/CategoryAlreadyExistsError';
import { CategoryHasProductsError } from '../../../modules/catalog/domain/errors/CategoryHasProductsError';

export function mapErrorToHttp(error: unknown): HttpError {
  if (error instanceof HttpError) {
    return error;
  }

  if (error instanceof CategoryNotFoundError || error instanceof ProductNotFoundError) {
    return new HttpError(error.message, 404);
  }

  if (error instanceof CategoryAlreadyExistsError || error instanceof CategoryHasProductsError) {
    return new HttpError(error.message, 409);
  }

  if (error instanceof ValidationError) {
    return new HttpError(error.message, 400);
  }

  if (error instanceof DomainError) {
    return new HttpError(error.message, 400);
  }

  return new HttpError('Erro interno do servidor.', 500);
}
