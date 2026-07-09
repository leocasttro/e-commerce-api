import { Category } from '../../../domain/entities/Category';
import { CategoryNotFoundError } from '../../../domain/errors/CategoryNotFoundError';
import { CategoryRepository } from '../../../domain/repositories/CategoryRepository';

interface GetCategoryByIdInput {
  id: string;
}

export class GetCategoryByIdUseCase {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async execute(input: GetCategoryByIdInput): Promise<Category> {
    const category = await this.categoryRepository.findById(input.id);

    if (!category) {
      throw new CategoryNotFoundError();
    }

    return category;
  }
}
