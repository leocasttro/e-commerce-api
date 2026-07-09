import { ProductNotFoundError } from '../../../domain/errors/ProductNotFoundError';
import { ProductRepository } from '../../../domain/repositories/ProductRepository';

interface DeleteProductInput {
  id: string;
}

export class DeleteProductUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(input: DeleteProductInput): Promise<void> {
    const product = await this.productRepository.findById(input.id);

    if (!product) {
      throw new ProductNotFoundError();
    }

    await this.productRepository.delete(input.id);
  }
}
