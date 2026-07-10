import { Category } from '../../../domain/entities/Category';
import { InMemoryCategoryRepository } from '../../../tests/repositories/InMemoryCategoryRepository';
import { ListCategoriesUseCase } from './ListCategoriesUseCase';

describe('Listar categorias', () => {
  let categoryRepository: InMemoryCategoryRepository;
  let listCategoriesUseCase: ListCategoriesUseCase;

  beforeEach(() => {
    categoryRepository = new InMemoryCategoryRepository();
    listCategoriesUseCase = new ListCategoriesUseCase(categoryRepository);
  });

  it('deve listar categorias com paginacao padrao', async () => {
    await categoryRepository.create(Category.create({ name: 'Eletronicos' }));

    const result = await listCategoriesUseCase.execute({});

    expect(result.data).toHaveLength(1);
    expect(result.meta).toEqual({
      page: 1,
      limit: 10,
      total: 1,
      totalPages: 1,
    });
  });

  it('deve listar categorias usando pagina e limite', async () => {
    await categoryRepository.create(Category.create({ name: 'Eletronicos' }));
    await categoryRepository.create(Category.create({ name: 'Informatica' }));

    const result = await listCategoriesUseCase.execute({ page: 2, limit: 1 });

    expect(result.data).toHaveLength(1);
    expect(result.data[0].name).toBe('Informatica');
    expect(result.meta.totalPages).toBe(2);
  });
});
