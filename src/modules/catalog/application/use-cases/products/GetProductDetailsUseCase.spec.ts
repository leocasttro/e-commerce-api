import { UniqueEntityId } from '../../../../../shared/domain/value-objects/UniqueEntityId';
import { Category } from '../../../domain/entities/Category';
import { Product } from '../../../domain/entities/Product';
import { CategoryNotFoundError } from '../../../domain/errors/CategoryNotFoundError';
import { ProductNotFoundError } from '../../../domain/errors/ProductNotFoundError';
import { InMemoryCategoryRepository } from '../../../tests/repositories/InMemoryCategoryRepository';
import { InMemoryProductRepository } from '../../../tests/repositories/InMemoryProductRepository';
import { GetProductDetailsUseCase } from './GetProductDetailsUseCase';

describe('Buscar detalhes do produto', () => {
  let categoryRepository: InMemoryCategoryRepository;
  let productRepository: InMemoryProductRepository;
  let getProductDetailsUseCase: GetProductDetailsUseCase;

  beforeEach(() => {
    categoryRepository = new InMemoryCategoryRepository();
    productRepository = new InMemoryProductRepository();
    getProductDetailsUseCase = new GetProductDetailsUseCase(productRepository, categoryRepository);
  });

  it('deve buscar um produto com categoria', async () => {
    const category = await categoryRepository.create(Category.create({ name: 'Eletronicos' }));
    const product = await productRepository.create(
      Product.create({
        name: 'Notebook Dell',
        price: 3500,
        stock: 5,
        categoryId: category.id,
      }),
    );

    const result = await getProductDetailsUseCase.execute({
      id: product.id.toString(),
    });

    expect(result.product.id.equals(product.id)).toBe(true);
    expect(result.category.id.equals(category.id)).toBe(true);
  });

  it('nao deve buscar detalhes quando o produto nao existe', async () => {
    await expect(
      getProductDetailsUseCase.execute({
        id: 'non-existing-id',
      }),
    ).rejects.toBeInstanceOf(ProductNotFoundError);
  });

  it('nao deve buscar detalhes quando a categoria vinculada nao existe', async () => {
    const product = await productRepository.create(
      Product.create({
        name: 'Notebook Dell',
        price: 3500,
        stock: 5,
        categoryId: new UniqueEntityId(),
      }),
    );

    await expect(
      getProductDetailsUseCase.execute({
        id: product.id.toString(),
      }),
    ).rejects.toBeInstanceOf(CategoryNotFoundError);
  });
});
