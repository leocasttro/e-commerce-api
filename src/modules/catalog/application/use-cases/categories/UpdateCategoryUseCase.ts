import { Category } from '../../../domain/entities/Category';
import { CategoryAlreadyExistsError } from '../../../domain/errors/CategoryAlreadyExistsError';
import { CategoryNotFoundError } from '../../../domain/errors/CategoryNotFoundError';
import { CategoryRepository } from '../../../domain/repositories/CategoryRepository';

interface UpdateCategoryInput {
  id: string;
  name: string;
}

export class UpdateCategoryUseCase {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async execute(input: UpdateCategoryInput): Promise<Category> {
    const category = await this.categoryRepository.findById(input.id);

    if (!category) {
      throw new CategoryNotFoundError();
    }

    const categoryWithSameName = await this.categoryRepository.findByName(input.name.trim());

    if (categoryWithSameName && categoryWithSameName.id.toString() !== input.id) {
      throw new CategoryAlreadyExistsError();
    }

    category.updateName(input.name);

    return this.categoryRepository.save(category);
  }
}
