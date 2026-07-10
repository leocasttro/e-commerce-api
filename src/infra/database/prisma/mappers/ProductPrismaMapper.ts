import { Product as PrismaProduct, Prisma } from '@prisma/client';
import { Product } from '../../../../modules/catalog/domain/entities/Product';
import { UniqueEntityId } from '../../../../shared/domain/value-objects/UniqueEntityId';

export class ProductPrismaMapper {
  static toDomain(raw: PrismaProduct): Product {
    return Product.create(
      {
        name: raw.name,
        description: raw.description,
        price: raw.price.toNumber(),
        stock: raw.stock,
        categoryId: new UniqueEntityId(raw.categoryId),
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityId(raw.id),
    );
  }

  static toPrisma(product: Product): Prisma.ProductUncheckedCreateInput {
    return {
      id: product.id.toString(),
      name: product.name,
      description: product.description,
      price: new Prisma.Decimal(product.price),
      stock: product.stock,
      categoryId: product.categoryId.toString(),
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    };
  }
}
