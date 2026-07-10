import { PrismaCategoryRepository } from '../../../../infra/database/prisma/repositories/PrismaCategoryRepository';
import { CreateCategoryUseCase } from '../../application/use-cases/categories/CreateCategoryUseCase';
import { DeleteCategoryUseCase } from '../../application/use-cases/categories/DeleteCategoryUseCase';
import { GetCategoryByIdUseCase } from '../../application/use-cases/categories/GetCategoryByIdUseCase';
import { ListCategoriesUseCase } from '../../application/use-cases/categories/ListCategoriesUseCase';
import { UpdateCategoryUseCase } from '../../application/use-cases/categories/UpdateCategoryUseCase';
import { CategoryController } from '../controllers/CategoryController';

const categoryRepository = new PrismaCategoryRepository();

const createCategoryUseCase = new CreateCategoryUseCase(categoryRepository);
const listCategoriesUseCase = new ListCategoriesUseCase(categoryRepository);
const getCategoryByIdUseCase = new GetCategoryByIdUseCase(categoryRepository);
const updateCategoryUseCase = new UpdateCategoryUseCase(categoryRepository);
const deleteCategoryUseCase = new DeleteCategoryUseCase(categoryRepository);

export const categoryController = new CategoryController(
  createCategoryUseCase,
  listCategoriesUseCase,
  getCategoryByIdUseCase,
  updateCategoryUseCase,
  deleteCategoryUseCase,
);
