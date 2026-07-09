import { CategoryRepository } from '../../../domain/repositories/CategoryRepository';
import { Category } from '../../../domain/entities/Category';
import { CategoryAlreadyExistsError } from '../../../domain/errors/CategoryAlreadyExistsError';

interface CreateCategoryInput {
  name: string;
}

export class CreateCategoryUseCase {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async execute(input: CreateCategoryInput): Promise<Category> {
    const categoryExists = await this.categoryRepository.findByName(input.name.trim());

    if (categoryExists) {
      throw new CategoryAlreadyExistsError();
    }

    const category = Category.create({
      name: input.name,
    });

    return this.categoryRepository.create(category);
  }
}
