import {
  ProductFilters,
  ProductRepository,
} from '../../../../modules/catalog/domain/repositories/ProductRepository';
import { Product } from '../../../../modules/catalog/domain/entities/Product';
import { ProductPrismaMapper } from '../mappers/ProductPrismaMapper';
import { prisma } from '../client';
import { PaginationParams } from '../../../../shared/application/pagination/PaginationParams';
import { PaginatedResult } from '../../../../shared/application/pagination/PaginatedResult';
import { Prisma } from '@prisma/client';

export class PrismaProductRepository implements ProductRepository {
  async create(product: Product): Promise<Product> {
    const data = ProductPrismaMapper.toPrisma(product);

    const createdProduct = await prisma.product.create({
      data,
    });

    return ProductPrismaMapper.toDomain(createdProduct);
  }

  async findById(id: string): Promise<Product | null> {
    const product = await prisma.product.findUnique({
      where: { id },
    });

    return product ? ProductPrismaMapper.toDomain(product) : null;
  }

  async findMany(
    params: PaginationParams,
    filters?: ProductFilters,
  ): Promise<PaginatedResult<Product>> {
    const skip = (params.page - 1) * params.limit;

    const where: Prisma.ProductWhereInput = {
      categoryId: filters?.categoryId,
      name: filters?.name ? { contains: filters.name, mode: 'insensitive' } : undefined,
      price: {
        gte: filters?.priceMin !== undefined ? new Prisma.Decimal(filters.priceMin) : undefined,
        lte: filters?.priceMax !== undefined ? new Prisma.Decimal(filters.priceMax) : undefined,
      },
    };

    const [products, total] = await prisma.$transaction([
      prisma.product.findMany({
        where,
        skip,
        take: params.limit,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.product.count({ where }),
    ]);

    return {
      data: products.map(ProductPrismaMapper.toDomain),
      meta: {
        page: params.page,
        limit: params.limit,
        total,
        totalPages: Math.ceil(total / params.limit),
      },
    };
  }

  async save(product: Product): Promise<Product> {
    const data = ProductPrismaMapper.toPrisma(product);

    const updatedProduct = await prisma.product.update({
      where: { id: product.id.toString() },
      data: {
        name: data.name,
        description: data.description,
        price: data.price,
        stock: data.stock,
        categoryId: data.categoryId,
        updatedAt: data.updatedAt,
      },
    });

    return ProductPrismaMapper.toDomain(updatedProduct);
  }

  async delete(id: string): Promise<void> {
    await prisma.product.delete({
      where: { id },
    });
  }
}
