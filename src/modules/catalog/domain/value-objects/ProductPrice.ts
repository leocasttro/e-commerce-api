import { ValidationError } from '../../../../shared/domain/errors/ValidationError';

export class ProductPrice {
  private constructor(private readonly value: number) {}

  static create(value: number): ProductPrice {
    if (value <= 0) {
      throw new ValidationError('O preço do produto deve ser maior que zero.');
    }

    return new ProductPrice(value);
  }

  toNumber(): number {
    return this.value;
  }
}
