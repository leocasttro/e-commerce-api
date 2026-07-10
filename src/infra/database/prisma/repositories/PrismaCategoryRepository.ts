import { CategoryRepository } from '../../../../modules/catalog/domain/repositories/CategoryRepository';
import { Category } from '../../../../modules/catalog/domain/entities/Category';
import { CategoryPrismaMapper } from '../mappers/CategoryPrismaMapper';
import { prisma } from '../client';
import { PaginationParams } from '../../../../shared/application/pagination/PaginationParams';
import { PaginatedResult } from '../../../../shared/application/pagination/PaginatedResult';

export class PrismaCategoryRepository implements CategoryRepository {
  async create(category: Category): Promise<Category> {
    const data = CategoryPrismaMapper.toPrisma(category);

    const createdCategory = await prisma.category.create({
      data,
    });

    return CategoryPrismaMapper.toDomain(createdCategory);
  }

  async findById(id: string): Promise<Category | null> {
    const category = await prisma.category.findUnique({
      where: { id },
    });

    return category ? CategoryPrismaMapper.toDomain(category) : null;
  }

  async findByName(name: string): Promise<Category | null> {
    const category = await prisma.category.findUnique({
      where: { name },
    });

    return category ? CategoryPrismaMapper.toDomain(category) : null;
  }

  async findMany(params: PaginationParams): Promise<PaginatedResult<Category>> {
    const skip = (params.page - 1) * params.limit;

    const [categories, total] = await prisma.$transaction([
      prisma.category.findMany({
        skip,
        take: params.limit,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.category.count(),
    ]);

    return {
      data: categories.map(CategoryPrismaMapper.toDomain),
      meta: {
        page: params.page,
        limit: params.limit,
        total,
        totalPages: Math.ceil(total / params.limit),
      },
    };
  }

  async save(category: Category): Promise<Category> {
    const data = CategoryPrismaMapper.toPrisma(category);

    const updatedCategory = await prisma.category.update({
      where: { id: category.id.toString() },
      data: {
        name: data.name,
        updatedAt: data.updatedAt,
      },
    });

    return CategoryPrismaMapper.toDomain(updatedCategory);
  }

  async delete(id: string): Promise<void> {
    await prisma.category.delete({
      where: { id },
    });
  }

  async countProducts(categoryId: string): Promise<number> {
    return prisma.product.count({
      where: { categoryId },
    });
  }
}
