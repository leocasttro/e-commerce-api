import { Request, Response } from 'express';
import { CreateCategoryUseCase } from '../../application/use-cases/categories/CreateCategoryUseCase';
import { ListCategoriesUseCase } from '../../application/use-cases/categories/ListCategoriesUseCase';
import { GetCategoryByIdUseCase } from '../../application/use-cases/categories/GetCategoryByIdUseCase';
import { UpdateCategoryUseCase } from '../../application/use-cases/categories/UpdateCategoryUseCase';
import { DeleteCategoryUseCase } from '../../application/use-cases/categories/DeleteCategoryUseCase';
import { CategorySerializer } from '../serializers/CategorySerializer';

export class CategoryController {
  constructor(
    private readonly createCategoryUseCase: CreateCategoryUseCase,
    private readonly listCategoriesUseCase: ListCategoriesUseCase,
    private readonly getCategoryByIdUseCase: GetCategoryByIdUseCase,
    private readonly updateCategoryUseCase: UpdateCategoryUseCase,
    private readonly deleteCategoryUseCase: DeleteCategoryUseCase,
  ) {}

  async create(request: Request, response: Response): Promise<Response> {
    const category = await this.createCategoryUseCase.execute({
      name: request.body.name,
    });

    return response.status(201).json(CategorySerializer.toHttp(category));
  }

  async list(request: Request, response: Response): Promise<Response> {
    const result = await this.listCategoriesUseCase.execute({
      page: request.query.page ? Number(request.query.page) : undefined,
      limit: request.query.limit ? Number(request.query.limit) : undefined,
    });

    return response.json({
      data: result.data.map(CategorySerializer.toHttp),
      meta: result.meta,
    });
  }

  async getById(request: Request, response: Response): Promise<Response> {
    const category = await this.getCategoryByIdUseCase.execute({
      id: request.params.id.toString(),
    });

    return response.json(CategorySerializer.toHttp(category));
  }

  async update(request: Request, response: Response): Promise<Response> {
    const category = await this.updateCategoryUseCase.execute({
      id: request.params.id.toString(),
      name: request.body.name,
    });

    return response.json(CategorySerializer.toHttp(category));
  }

  async delete(request: Request, response: Response): Promise<Response> {
    await this.deleteCategoryUseCase.execute({
      id: request.params.id.toString(),
    });

    return response.status(204).send();
  }
}
