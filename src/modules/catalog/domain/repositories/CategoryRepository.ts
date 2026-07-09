import { Category } from '../entities/Category';
import { PaginationParams } from '../../../../shared/application/pagination/PaginationParams';
import { PaginatedResult } from '../../../../shared/application/pagination/PaginatedResult';

export interface CategoryRepository {
  create(category: Category): Promise<Category>;
  findById(id: string): Promise<Category | null>;
  findByName(name: string): Promise<Category | null>;
  findMany(params: PaginationParams): Promise<PaginatedResult<Category>>;
  save(category: Category): Promise<Category>;
  delete(id: string): Promise<void>;
  countProducts(categoryId: string): Promise<number>;
}
