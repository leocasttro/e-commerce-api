import { ValidationError } from '../../../../../shared/domain/errors/ValidationError';
import { Category } from '../../../domain/entities/Category';
import { Product } from '../../../domain/entities/Product';
import { CategoryNotFoundError } from '../../../domain/errors/CategoryNotFoundError';
import { ProductNotFoundError } from '../../../domain/errors/ProductNotFoundError';
import { InMemoryCategoryRepository } from '../../../tests/repositories/InMemoryCategoryRepository';
import { InMemoryProductRepository } from '../../../tests/repositories/InMemoryProductRepository';
import { UpdateProductUseCase } from './UpdateProductUseCase';

describe('Atualizar produto', () => {
  let categoryRepository: InMemoryCategoryRepository;
  let productRepository: InMemoryProductRepository;
  let updateProductUseCase: UpdateProductUseCase;

  beforeEach(() => {
    categoryRepository = new InMemoryCategoryRepository();
    productRepository = new InMemoryProductRepository();
    updateProductUseCase = new UpdateProductUseCase(productRepository, categoryRepository);
  });

  it('deve atualizar um produto', async () => {
    const category = await categoryRepository.create(Category.create({ name: 'Eletronicos' }));
    const product = await productRepository.create(
      Product.create({
        name: 'Notebook Dell',
        price: 3500,
        stock: 5,
        categoryId: category.id,
      }),
    );

    const result = await updateProductUseCase.execute({
      id: product.id.toString(),
      name: 'Notebook Dell Pro',
      price: 4200,
      stock: 3,
    });

    expect(result.name).toBe('Notebook Dell Pro');
    expect(result.price).toBe(4200);
    expect(result.stock).toBe(3);
  });

  it('nao deve atualizar um produto inexistente', async () => {
    await expect(
      updateProductUseCase.execute({
        id: 'non-existing-id',
        name: 'Notebook Dell Pro',
      }),
    ).rejects.toBeInstanceOf(ProductNotFoundError);
  });

  it('nao deve atualizar um produto para uma categoria inexistente', async () => {
    const category = await categoryRepository.create(Category.create({ name: 'Eletronicos' }));
    const product = await productRepository.create(
      Product.create({
        name: 'Notebook Dell',
        price: 3500,
        stock: 5,
        categoryId: category.id,
      }),
    );

    await expect(
      updateProductUseCase.execute({
        id: product.id.toString(),
        categoryId: 'non-existing-id',
      }),
    ).rejects.toBeInstanceOf(CategoryNotFoundError);
  });

  it('deve validar preco e estoque ao atualizar um produto', async () => {
    const category = await categoryRepository.create(Category.create({ name: 'Eletronicos' }));
    const product = await productRepository.create(
      Product.create({
        name: 'Notebook Dell',
        price: 3500,
        stock: 5,
        categoryId: category.id,
      }),
    );

    await expect(
      updateProductUseCase.execute({
        id: product.id.toString(),
        price: 0,
      }),
    ).rejects.toBeInstanceOf(ValidationError);
  });
});
