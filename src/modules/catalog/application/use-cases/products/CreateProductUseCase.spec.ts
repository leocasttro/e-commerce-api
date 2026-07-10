import { ValidationError } from '../../../../../shared/domain/errors/ValidationError';
import { Category } from '../../../domain/entities/Category';
import { CategoryNotFoundError } from '../../../domain/errors/CategoryNotFoundError';
import { InMemoryCategoryRepository } from '../../../tests/repositories/InMemoryCategoryRepository';
import { InMemoryProductRepository } from '../../../tests/repositories/InMemoryProductRepository';
import { CreateProductUseCase } from './CreateProductUseCase';

describe('Criar produto', () => {
  let categoryRepository: InMemoryCategoryRepository;
  let productRepository: InMemoryProductRepository;
  let createProductUseCase: CreateProductUseCase;

  beforeEach(() => {
    categoryRepository = new InMemoryCategoryRepository();
    productRepository = new InMemoryProductRepository();
    createProductUseCase = new CreateProductUseCase(productRepository, categoryRepository);
  });

  it('deve criar um produto quando a categoria existe', async () => {
    const category = await categoryRepository.create(Category.create({ name: 'Eletronicos' }));

    const product = await createProductUseCase.execute({
      name: 'Notebook Dell',
      description: 'Notebook para trabalho',
      price: 3500,
      stock: 5,
      categoryId: category.id.toString(),
    });

    expect(product.id).toBeDefined();
    expect(product.name).toBe('Notebook Dell');
    expect(productRepository.items).toHaveLength(1);
  });

  it('nao deve criar um produto quando a categoria nao existe', async () => {
    await expect(
      createProductUseCase.execute({
        name: 'Notebook Dell',
        description: null,
        price: 3500,
        stock: 5,
        categoryId: 'non-existing-id',
      }),
    ).rejects.toBeInstanceOf(CategoryNotFoundError);
  });

  it('nao deve criar um produto com preco invalido', async () => {
    const category = await categoryRepository.create(Category.create({ name: 'Eletronicos' }));

    await expect(
      createProductUseCase.execute({
        name: 'Notebook Dell',
        description: null,
        price: 0,
        stock: 5,
        categoryId: category.id.toString(),
      }),
    ).rejects.toBeInstanceOf(ValidationError);
  });

  it('nao deve criar um produto com estoque invalido', async () => {
    const category = await categoryRepository.create(Category.create({ name: 'Eletronicos' }));

    await expect(
      createProductUseCase.execute({
        name: 'Notebook Dell',
        description: null,
        price: 3500,
        stock: -1,
        categoryId: category.id.toString(),
      }),
    ).rejects.toBeInstanceOf(ValidationError);
  });
});
