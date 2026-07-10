import { Category } from '../../domain/entities/Category';

export class CategorySerializer {
  static toHttp(category: Category) {
    return {
      id: category.id.toString(),
      name: category.name,
      createdAt: category.createdAt,
      updatedAt: category.updatedAt,
    };
  }
}
