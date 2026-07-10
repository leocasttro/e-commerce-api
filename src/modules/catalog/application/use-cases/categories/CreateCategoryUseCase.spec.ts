import { CategoryAlreadyExistsError } from '../../../domain/errors/CategoryAlreadyExistsError';
import { InMemoryCategoryRepository } from '../../../tests/repositories/InMemoryCategoryRepository';
import { CreateCategoryUseCase } from './CreateCategoryUseCase';

describe('Criar categoria', () => {
  let categoryRepository: InMemoryCategoryRepository;
  let createCategoryUseCase: CreateCategoryUseCase;

  beforeEach(() => {
    categoryRepository = new InMemoryCategoryRepository();
    createCategoryUseCase = new CreateCategoryUseCase(categoryRepository);
  });

  it('deve criar uma categoria', async () => {
    const category = await createCategoryUseCase.execute({
      name: 'Eletronicos',
    });

    expect(category.id).toBeDefined();
    expect(category.name).toBe('Eletronicos');
    expect(categoryRepository.items).toHaveLength(1);
  });

  it('nao deve criar uma categoria duplicada', async () => {
    await createCategoryUseCase.execute({
      name: 'Eletronicos',
    });

    await expect(
      createCategoryUseCase.execute({
        name: 'Eletronicos',
      }),
    ).rejects.toBeInstanceOf(CategoryAlreadyExistsError);
  });
});
