import { Product } from '../../domain/entities/Product';
import { Category } from '../../domain/entities/Category';
import { CategorySerializer } from './CategorySerializer';

export class ProductSerializer {
  static toHttp(product: Product) {
    return {
      id: product.id.toString(),
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
      categoryId: product.categoryId.toString(),
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    };
  }

  static toHttpWithCategory(product: Product, category: Category) {
    return {
      ...ProductSerializer.toHttp(product),
      category: CategorySerializer.toHttp(category),
    };
  }
}
