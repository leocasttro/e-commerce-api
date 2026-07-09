import { PaginatedResult } from '../../../../../shared/application/pagination/PaginatedResult';
import { PaginationParams } from '../../../../../shared/application/pagination/PaginationParams';
import { Category } from '../../../domain/entities/Category';
import { CategoryRepository } from '../../../domain/repositories/CategoryRepository';
import { normalizePagination } from '../../../../../shared/application/pagination/normalizePagination';

export class ListCategoriesUseCase {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async execute(params: PaginationParams): Promise<PaginatedResult<Category>> {
    const pagination = normalizePagination(params);

    return this.categoryRepository.findMany(pagination);
  }
}
