import { CategoryHasProductsError } from '../../../domain/errors/CategoryHasProductsError';
import { CategoryNotFoundError } from '../../../domain/errors/CategoryNotFoundError';
import { CategoryRepository } from '../../../domain/repositories/CategoryRepository';

interface DeleteCategoryInput {
  id: string;
}

export class DeleteCategoryUseCase {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async execute(input: DeleteCategoryInput): Promise<void> {
    const category = await this.categoryRepository.findById(input.id);

    if (!category) {
      throw new CategoryNotFoundError();
    }

    const productsCount = await this.categoryRepository.countProducts(input.id);

    if (productsCount > 0) {
      throw new CategoryHasProductsError();
    }

    await this.categoryRepository.delete(input.id);
  }
}
