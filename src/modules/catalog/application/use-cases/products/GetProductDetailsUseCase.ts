import { Product } from '../../../domain/entities/Product';
import { Category } from '../../../domain/entities/Category';
import { ProductRepository } from '../../../domain/repositories/ProductRepository';
import { CategoryRepository } from '../../../domain/repositories/CategoryRepository';
import { ProductNotFoundError } from '../../../domain/errors/ProductNotFoundError';
import { CategoryNotFoundError } from '../../../domain/errors/CategoryNotFoundError';

interface GetProductDetailsInput {
  id: string;
}

interface GetProductDetailsOutput {
  product: Product;
  category: Category;
}

export class GetProductDetailsUseCase {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly categoryRepository: CategoryRepository,
  ) {}

  async execute(input: GetProductDetailsInput): Promise<GetProductDetailsOutput> {
    const product = await this.productRepository.findById(input.id);

    if (!product) {
      throw new ProductNotFoundError();
    }

    const category = await this.categoryRepository.findById(product.categoryId.toString());

    if (!category) {
      throw new CategoryNotFoundError();
    }

    return {
      product,
      category,
    };
  }
}
