import { ProductRepository } from '../../../domain/repositories/ProductRepository';
import { CategoryRepository } from '../../../domain/repositories/CategoryRepository';
import { Product } from '../../../domain/entities/Product';
import { CategoryNotFoundError } from '../../../domain/errors/CategoryNotFoundError';
import { UniqueEntityId } from '../../../../../shared/domain/value-objects/UniqueEntityId';

interface CreateProductInput {
  name: string;
  description: string | null;
  price: number;
  stock: number;
  categoryId: string;
}

export class CreateProductUseCase {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly categoryRepository: CategoryRepository,
  ) {}

  async execute(input: CreateProductInput): Promise<Product> {
    const category = await this.categoryRepository.findById(input.categoryId);

    if (!category) {
      throw new CategoryNotFoundError();
    }

    const product = Product.create({
      name: input.name,
      description: input.description,
      price: input.price,
      stock: input.stock,
      categoryId: new UniqueEntityId(input.categoryId),
    });

    return this.productRepository.create(product);
  }
}
