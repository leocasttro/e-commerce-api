import { DomainError } from '../../../../shared/domain/errors/DomainError';

export class CategoryHasProductsError extends DomainError {
  constructor() {
    super('Não é possível excluir uma categoria com produtos vinculados.');
  }
}
