import { Category } from '../../../domain/entities/Category';
import { CategoryAlreadyExistsError } from '../../../domain/errors/CategoryAlreadyExistsError';
import { CategoryNotFoundError } from '../../../domain/errors/CategoryNotFoundError';
import { InMemoryCategoryRepository } from '../../../tests/repositories/InMemoryCategoryRepository';
import { UpdateCategoryUseCase } from './UpdateCategoryUseCase';

describe('Atualizar categoria', () => {
  let categoryRepository: InMemoryCategoryRepository;
  let updateCategoryUseCase: UpdateCategoryUseCase;

  beforeEach(() => {
    categoryRepository = new InMemoryCategoryRepository();
    updateCategoryUseCase = new UpdateCategoryUseCase(categoryRepository);
  });

  it('deve atualizar uma categoria', async () => {
    const category = await categoryRepository.create(Category.create({ name: 'Eletronicos' }));

    const result = await updateCategoryUseCase.execute({
      id: category.id.toString(),
      name: 'Informatica',
    });

    expect(result.name).toBe('Informatica');
  });

  it('nao deve atualizar uma categoria inexistente', async () => {
    await expect(
      updateCategoryUseCase.execute({
        id: 'non-existing-id',
        name: 'Informatica',
      }),
    ).rejects.toBeInstanceOf(CategoryNotFoundError);
  });

  it('nao deve atualizar uma categoria para um nome duplicado', async () => {
    const category = await categoryRepository.create(Category.create({ name: 'Eletronicos' }));
    await categoryRepository.create(Category.create({ name: 'Informatica' }));

    await expect(
      updateCategoryUseCase.execute({
        id: category.id.toString(),
        name: 'Informatica',
      }),
    ).rejects.toBeInstanceOf(CategoryAlreadyExistsError);
  });
});
