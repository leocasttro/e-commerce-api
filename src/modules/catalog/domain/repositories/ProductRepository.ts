import { Product } from '../entities/Product';
import { PaginationParams } from '../../../../shared/application/pagination/PaginationParams';
import { PaginatedResult } from '../../../../shared/application/pagination/PaginatedResult';

export interface ProductFilters {
  categoryId?: string;
  priceMin?: number;
  priceMax?: number;
  name?: string;
}

export interface ProductRepository {
  create(product: Product): Promise<Product>;
  findById(id: string): Promise<Product | null>;
  findMany(params: PaginationParams, filters?: ProductFilters): Promise<PaginatedResult<Product>>;
  save(product: Product): Promise<Product>;
  delete(id: string): Promise<void>;
}
