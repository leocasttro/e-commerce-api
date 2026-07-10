import { Router } from 'express';
import { productController } from '../factories/productControllerFactory';
import { asyncHandler } from '../../../../shared/presentation/http/asyncHandler';

export const productRoutes = Router();

productRoutes.post('/', asyncHandler(productController.create.bind(productController)));
productRoutes.get('/', asyncHandler(productController.list.bind(productController)));
productRoutes.get('/:id', asyncHandler(productController.getById.bind(productController)));
productRoutes.put('/:id', asyncHandler(productController.update.bind(productController)));
productRoutes.delete('/:id', asyncHandler(productController.delete.bind(productController)));
