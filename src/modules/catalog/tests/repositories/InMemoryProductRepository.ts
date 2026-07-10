import { PaginatedResult } from '../../../../shared/application/pagination/PaginatedResult';
import { PaginationParams } from '../../../../shared/application/pagination/PaginationParams';
import { Product } from '../../domain/entities/Product';
import { ProductFilters, ProductRepository } from '../../domain/repositories/ProductRepository';

export class InMemoryProductRepository implements ProductRepository {
  public items: Product[] = [];

  async create(product: Product): Promise<Product> {
    this.items.push(product);

    return product;
  }

  async findById(id: string): Promise<Product | null> {
    return this.items.find((product) => product.id.toString() === id) ?? null;
  }

  async findMany(
    params: PaginationParams,
    filters?: ProductFilters,
  ): Promise<PaginatedResult<Product>> {
    const filteredProducts = this.items.filter((product) => {
      const matchesCategory =
        !filters?.categoryId || product.categoryId.toString() === filters.categoryId;
      const matchesPriceMin = filters?.priceMin === undefined || product.price >= filters.priceMin;
      const matchesPriceMax = filters?.priceMax === undefined || product.price <= filters.priceMax;
      const matchesName =
        !filters?.name || product.name.toLowerCase().includes(filters.name.toLowerCase());

      return matchesCategory && matchesPriceMin && matchesPriceMax && matchesName;
    });

    const start = (params.page - 1) * params.limit;
    const data = filteredProducts.slice(start, start + params.limit);

    return {
      data,
      meta: {
        page: params.page,
        limit: params.limit,
        total: filteredProducts.length,
        totalPages: Math.ceil(filteredProducts.length / params.limit),
      },
    };
  }

  async save(product: Product): Promise<Product> {
    const index = this.items.findIndex((item) => item.id.equals(product.id));

    if (index >= 0) {
      this.items[index] = product;
    }

    return product;
  }

  async delete(id: string): Promise<void> {
    this.items = this.items.filter((product) => product.id.toString() !== id);
  }
}
