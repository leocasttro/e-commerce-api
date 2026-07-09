import { DomainError } from '../../domain/errors/DomainError';
import { ValidationError } from '../../domain/errors/ValidationError';
import { HttpError } from './HttpError';

export function mapErrorToHttp(error: unknown): HttpError {
  if (error instanceof HttpError) {
    return error;
  }

  if (error instanceof ValidationError) {
    return new HttpError(error.message, 400);
  }

  if (error instanceof DomainError) {
    return new HttpError(error.message, 400);
  }

  return new HttpError('Erro interno do servidor.', 500);
}
