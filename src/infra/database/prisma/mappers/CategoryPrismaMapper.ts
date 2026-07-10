import { Category as PrismaCategory } from '@prisma/client';
import { Category } from '../../../../modules/catalog/domain/entities/Category';
import { UniqueEntityId } from '../../../../shared/domain/value-objects/UniqueEntityId';

export class CategoryPrismaMapper {
  static toDomain(raw: PrismaCategory): Category {
    return Category.create(
      {
        name: raw.name,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityId(raw.id),
    );
  }

  static toPrisma(category: Category): PrismaCategory {
    return {
      id: category.id.toString(),
      name: category.name,
      createdAt: category.createdAt,
      updatedAt: category.updatedAt,
    };
  }
}
