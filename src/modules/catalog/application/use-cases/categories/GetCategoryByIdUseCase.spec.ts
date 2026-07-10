import { Category } from '../../../domain/entities/Category';
import { CategoryNotFoundError } from '../../../domain/errors/CategoryNotFoundError';
import { InMemoryCategoryRepository } from '../../../tests/repositories/InMemoryCategoryRepository';
import { GetCategoryByIdUseCase } from './GetCategoryByIdUseCase';

describe('Buscar categoria por ID', () => {
  let categoryRepository: InMemoryCategoryRepository;
  let getCategoryByIdUseCase: GetCategoryByIdUseCase;

  beforeEach(() => {
    categoryRepository = new InMemoryCategoryRepository();
    getCategoryByIdUseCase = new GetCategoryByIdUseCase(categoryRepository);
  });

  it('deve buscar uma categoria por ID', async () => {
    const category = await categoryRepository.create(Category.create({ name: 'Eletronicos' }));

    const result = await getCategoryByIdUseCase.execute({
      id: category.id.toString(),
    });

    expect(result.id.equals(category.id)).toBe(true);
  });

  it('nao deve buscar uma categoria inexistente', async () => {
    await expect(
      getCategoryByIdUseCase.execute({
        id: 'non-existing-id',
      }),
    ).rejects.toBeInstanceOf(CategoryNotFoundError);
  });
});
