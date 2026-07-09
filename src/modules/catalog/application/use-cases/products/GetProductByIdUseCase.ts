import { ProductRepository } from '../../../domain/repositories/ProductRepository';
import { Product } from '../../../domain/entities/Product';
import { ProductNotFoundError } from '../../../domain/errors/ProductNotFoundError';

interface GetProductByIdInput {
  id: string;
}

export class GetProductByIdUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(input: GetProductByIdInput): Promise<Product> {
    const product = await this.productRepository.findById(input.id);

    if (!product) {
      throw new ProductNotFoundError();
    }

    return product;
  }
}
