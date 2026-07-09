import { ValidationError } from '../../../../shared/domain/errors/ValidationError';

export class ProductStock {
  private constructor(private readonly value: number) {}

  static create(value: number): ProductStock {
    if (!Number.isInteger(value)) {
      throw new ValidationError('O estoque do produto deve ser um número inteiro.');
    }

    if (value < 0) {
      throw new ValidationError('O estoque do produto não pode ser negativo.');
    }

    return new ProductStock(value);
  }

  toNumber(): number {
    return this.value;
  }
}
