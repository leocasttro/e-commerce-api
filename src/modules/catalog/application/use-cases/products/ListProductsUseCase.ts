import { PaginationParams } from '../../../../../shared/application/pagination/PaginationParams';
import { ProductFilters, ProductRepository } from '../../../domain/repositories/ProductRepository';
import { PaginatedResult } from '../../../../../shared/application/pagination/PaginatedResult';
import { Product } from '../../../domain/entities/Product';

interface ListProductsInput extends PaginationParams, ProductFilters {}

export class ListProductsUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(input: ListProductsInput): Promise<PaginatedResult<Product>> {
    const { page, limit, ...filters } = input;

    return this.productRepository.findMany({ page, limit }, filters);
  }
}
