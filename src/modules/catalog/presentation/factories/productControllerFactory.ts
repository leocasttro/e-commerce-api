import { PrismaCategoryRepository } from '../../../../infra/database/prisma/repositories/PrismaCategoryRepository';
import { PrismaProductRepository } from '../../../../infra/database/prisma/repositories/PrismaProductRepository';
import { CreateProductUseCase } from '../../application/use-cases/products/CreateProductUseCase';
import { DeleteProductUseCase } from '../../application/use-cases/products/DeleteProductUseCase';
import { GetProductDetailsUseCase } from '../../application/use-cases/products/GetProductDetailsUseCase';
import { ListProductsUseCase } from '../../application/use-cases/products/ListProductsUseCase';
import { UpdateProductUseCase } from '../../application/use-cases/products/UpdateProductUseCase';
import { ProductController } from '../controllers/ProductController';

const productRepository = new PrismaProductRepository();
const categoryRepository = new PrismaCategoryRepository();

const createProductUseCase = new CreateProductUseCase(productRepository, categoryRepository);
const listProductsUseCase = new ListProductsUseCase(productRepository);
const getProductDetailsUseCase = new GetProductDetailsUseCase(
  productRepository,
  categoryRepository,
);
const updateProductUseCase = new UpdateProductUseCase(productRepository, categoryRepository);
const deleteProductUseCase = new DeleteProductUseCase(productRepository);

export const productController = new ProductController(
  createProductUseCase,
  listProductsUseCase,
  getProductDetailsUseCase,
  updateProductUseCase,
  deleteProductUseCase,
);
