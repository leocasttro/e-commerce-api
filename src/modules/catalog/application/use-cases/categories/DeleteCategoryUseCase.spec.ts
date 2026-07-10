import { Category } from '../../../domain/entities/Category';
import { CategoryHasProductsError } from '../../../domain/errors/CategoryHasProductsError';
import { CategoryNotFoundError } from '../../../domain/errors/CategoryNotFoundError';
import { InMemoryCategoryRepository } from '../../../tests/repositories/InMemoryCategoryRepository';
import { DeleteCategoryUseCase } from './DeleteCategoryUseCase';

describe('Excluir categoria', () => {
  let categoryRepository: InMemoryCategoryRepository;
  let deleteCategoryUseCase: DeleteCategoryUseCase;

  beforeEach(() => {
    categoryRepository = new InMemoryCategoryRepository();
    deleteCategoryUseCase = new DeleteCategoryUseCase(categoryRepository);
  });

  it('deve excluir uma categoria', async () => {
    const category = await categoryRepository.create(Category.create({ name: 'Eletronicos' }));

    await deleteCategoryUseCase.execute({
      id: category.id.toString(),
    });

    expect(categoryRepository.items).toHaveLength(0);
  });

  it('nao deve excluir uma categoria inexistente', async () => {
    await expect(
      deleteCategoryUseCase.execute({
        id: 'non-existing-id',
      }),
    ).rejects.toBeInstanceOf(CategoryNotFoundError);
  });

  it('nao deve excluir uma categoria com produtos vinculados', async () => {
    const category = await categoryRepository.create(Category.create({ name: 'Eletronicos' }));
    categoryRepository.productsCountByCategoryId.set(category.id.toString(), 1);

    await expect(
      deleteCategoryUseCase.execute({
        id: category.id.toString(),
      }),
    ).rejects.toBeInstanceOf(CategoryHasProductsError);
  });
});
