import { PaginatedResult } from '../../../../shared/application/pagination/PaginatedResult';
import { PaginationParams } from '../../../../shared/application/pagination/PaginationParams';
import { Category } from '../../domain/entities/Category';
import { CategoryRepository } from '../../domain/repositories/CategoryRepository';

export class InMemoryCategoryRepository implements CategoryRepository {
  public items: Category[] = [];
  public productsCountByCategoryId = new Map<string, number>();

  async create(category: Category): Promise<Category> {
    this.items.push(category);

    return category;
  }

  async findById(id: string): Promise<Category | null> {
    return this.items.find((category) => category.id.toString() === id) ?? null;
  }

  async findByName(name: string): Promise<Category | null> {
    return this.items.find((category) => category.name === name) ?? null;
  }

  async findMany(params: PaginationParams): Promise<PaginatedResult<Category>> {
    const start = (params.page - 1) * params.limit;
    const data = this.items.slice(start, start + params.limit);

    return {
      data,
      meta: {
        page: params.page,
        limit: params.limit,
        total: this.items.length,
        totalPages: Math.ceil(this.items.length / params.limit),
      },
    };
  }

  async save(category: Category): Promise<Category> {
    const index = this.items.findIndex((item) => item.id.equals(category.id));

    if (index >= 0) {
      this.items[index] = category;
    }

    return category;
  }

  async delete(id: string): Promise<void> {
    this.items = this.items.filter((category) => category.id.toString() !== id);
  }

  async countProducts(categoryId: string): Promise<number> {
    return this.productsCountByCategoryId.get(categoryId) ?? 0;
  }
}
