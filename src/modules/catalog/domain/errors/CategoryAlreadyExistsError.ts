import { DomainError } from '../../../../shared/domain/errors/DomainError';

export class CategoryAlreadyExistsError extends DomainError {
  constructor() {
    super('Já existe uma categoria com este nome.');
  }
}
