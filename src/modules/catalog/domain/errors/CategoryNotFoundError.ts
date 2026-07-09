import { DomainError } from '../../../../shared/domain/errors/DomainError';

export class CategoryNotFoundError extends DomainError {
  constructor() {
    super('Categoria não encontrada.');
  }
}
