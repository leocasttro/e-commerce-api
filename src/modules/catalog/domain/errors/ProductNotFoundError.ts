import { DomainError } from '../../../../shared/domain/errors/DomainError';

export class ProductNotFoundError extends DomainError {
  constructor() {
    super('Produto não encontrado.');
  }
}
