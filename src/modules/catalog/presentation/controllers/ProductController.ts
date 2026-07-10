import { Request, Response } from 'express';
import { CreateProductUseCase } from '../../application/use-cases/products/CreateProductUseCase';
import { DeleteProductUseCase } from '../../application/use-cases/products/DeleteProductUseCase';
import { GetProductDetailsUseCase } from '../../application/use-cases/products/GetProductDetailsUseCase';
import { ListProductsUseCase } from '../../application/use-cases/products/ListProductsUseCase';
import { UpdateProductUseCase } from '../../application/use-cases/products/UpdateProductUseCase';
import { ProductSerializer } from '../serializers/ProductSerializer';

export class ProductController {
  constructor(
    private readonly createProductUseCase: CreateProductUseCase,
    private readonly listProductsUseCase: ListProductsUseCase,
    private readonly getProductDetailsUseCase: GetProductDetailsUseCase,
    private readonly updateProductUseCase: UpdateProductUseCase,
    private readonly deleteProductUseCase: DeleteProductUseCase,
  ) {}

  async create(request: Request, response: Response): Promise<Response> {
    const product = await this.createProductUseCase.execute({
      name: request.body.name,
      description: request.body.description,
      price: request.body.price,
      stock: request.body.stock,
      categoryId: request.body.categoryId,
    });

    return response.status(201).json(ProductSerializer.toHttp(product));
  }

  async list(request: Request, response: Response): Promise<Response> {
    const result = await this.listProductsUseCase.execute({
      page: request.query.page ? Number(request.query.page) : undefined,
      limit: request.query.limit ? Number(request.query.limit) : undefined,
      categoryId: request.query.categoryId?.toString(),
      priceMin: request.query.priceMin ? Number(request.query.priceMin) : undefined,
      priceMax: request.query.priceMax ? Number(request.query.priceMax) : undefined,
      name: request.query.name?.toString(),
    });

    return response.json({
      data: result.data.map(ProductSerializer.toHttp),
      meta: result.meta,
    });
  }

  async getById(request: Request, response: Response): Promise<Response> {
    const result = await this.getProductDetailsUseCase.execute({
      id: request.params.id.toString(),
    });

    return response.json(ProductSerializer.toHttpWithCategory(result.product, result.category));
  }

  async update(request: Request, response: Response): Promise<Response> {
    const product = await this.updateProductUseCase.execute({
      id: request.params.id.toString(),
      name: request.body.name,
      description: request.body.description,
      price: request.body.price,
      stock: request.body.stock,
      categoryId: request.body.categoryId,
    });

    return response.json(ProductSerializer.toHttp(product));
  }

  async delete(request: Request, response: Response): Promise<Response> {
    await this.deleteProductUseCase.execute({
      id: request.params.id.toString(),
    });

    return response.status(204).send();
  }
}
