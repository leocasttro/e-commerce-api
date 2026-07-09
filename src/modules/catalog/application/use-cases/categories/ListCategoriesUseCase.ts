import { PaginatedResult } from '../../../../../shared/application/pagination/PaginatedResult';
import { PaginationParams } from '../../../../../shared/application/pagination/PaginationParams';
import { Category } from '../../../domain/entities/Category';
import { CategoryRepository } from '../../../domain/repositories/CategoryRepository';

export class ListCategoriesUseCase {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async execute(params: PaginationParams): Promise<PaginatedResult<Category>> {
    return this.categoryRepository.findMany(params);
  }
}
