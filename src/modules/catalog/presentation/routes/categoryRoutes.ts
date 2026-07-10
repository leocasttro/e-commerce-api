import { Router } from 'express';
import { categoryController } from '../factories/categoryControllerFactory';
import { asyncHandler } from '../../../../shared/presentation/http/asyncHandler';

export const categoryRoutes = Router();

categoryRoutes.post('/', asyncHandler(categoryController.create.bind(categoryController)));
categoryRoutes.get('/', asyncHandler(categoryController.list.bind(categoryController)));
categoryRoutes.get('/:id', asyncHandler(categoryController.getById.bind(categoryController)));
categoryRoutes.put('/:id', asyncHandler(categoryController.update.bind(categoryController)));
categoryRoutes.delete('/:id', asyncHandler(categoryController.delete.bind(categoryController)));
