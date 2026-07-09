import { PaginationParams } from '../../../../../shared/application/pagination/PaginationParams';
import { ProductFilters, ProductRepository } from '../../../domain/repositories/ProductRepository';
import { PaginatedResult } from '../../../../../shared/application/pagination/PaginatedResult';
import { Product } from '../../../domain/entities/Product';
import { ValidationError } from '../../../../../shared/domain/errors/ValidationError';
import { normalizePagination } from '../../../../../shared/application/pagination/normalizePagination';

interface ListProductsInput extends PaginationParams, ProductFilters {}

export class ListProductsUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(input: ListProductsInput): Promise<PaginatedResult<Product>> {
    if (
      input.priceMin !== undefined &&
      input.priceMax !== undefined &&
      input.priceMin > input.priceMax
    ) {
      throw new ValidationError('O preço mínimo não pode ser maior que o preço máximo.');
    }

    const pagination = normalizePagination({
      page: input.page,
      limit: input.limit,
    });

    const filters: ProductFilters = {
      categoryId: input.categoryId,
      priceMin: input.priceMin,
      priceMax: input.priceMax,
      name: input.name,
    };

    return this.productRepository.findMany(pagination, filters);
  }
}
