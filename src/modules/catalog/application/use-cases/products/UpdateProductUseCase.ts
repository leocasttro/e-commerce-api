import { ProductRepository } from '../../../domain/repositories/ProductRepository';
import { CategoryRepository } from '../../../domain/repositories/CategoryRepository';
import { Product } from '../../../domain/entities/Product';
import { ProductNotFoundError } from '../../../domain/errors/ProductNotFoundError';
import { UniqueEntityId } from '../../../../../shared/domain/value-objects/UniqueEntityId';
import { CategoryNotFoundError } from '../../../domain/errors/CategoryNotFoundError';

interface UpdateProductInput {
  id: string;
  name?: string;
  description?: string | null;
  price?: number;
  stock?: number;
  categoryId?: string;
}

export class UpdateProductUseCase {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly categoryRepository: CategoryRepository,
  ) {}

  async execute(input: UpdateProductInput): Promise<Product> {
    const product = await this.productRepository.findById(input.id);

    if (!product) {
      throw new ProductNotFoundError();
    }

    let categoryId: UniqueEntityId | undefined;

    if (input.categoryId !== undefined) {
      const category = await this.categoryRepository.findById(input.categoryId);

      if (!category) {
        throw new CategoryNotFoundError();
      }

      categoryId = new UniqueEntityId(input.categoryId);
    }

    product.update({
      name: input.name,
      description: input.description,
      price: input.price,
      stock: input.stock,
      categoryId,
    });

    return this.productRepository.save(product);
  }
}
