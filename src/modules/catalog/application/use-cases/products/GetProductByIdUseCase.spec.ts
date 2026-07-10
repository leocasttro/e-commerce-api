import { UniqueEntityId } from '../../../../../shared/domain/value-objects/UniqueEntityId';
import { Product } from '../../../domain/entities/Product';
import { ProductNotFoundError } from '../../../domain/errors/ProductNotFoundError';
import { InMemoryProductRepository } from '../../../tests/repositories/InMemoryProductRepository';
import { GetProductByIdUseCase } from './GetProductByIdUseCase';

describe('Buscar produto por ID', () => {
  let productRepository: InMemoryProductRepository;
  let getProductByIdUseCase: GetProductByIdUseCase;

  beforeEach(() => {
    productRepository = new InMemoryProductRepository();
    getProductByIdUseCase = new GetProductByIdUseCase(productRepository);
  });

  it('deve buscar um produto por ID', async () => {
    const product = await productRepository.create(
      Product.create({
        name: 'Notebook Dell',
        price: 3500,
        stock: 5,
        categoryId: new UniqueEntityId(),
      }),
    );

    const result = await getProductByIdUseCase.execute({
      id: product.id.toString(),
    });

    expect(result.id.equals(product.id)).toBe(true);
  });

  it('nao deve buscar um produto inexistente', async () => {
    await expect(
      getProductByIdUseCase.execute({
        id: 'non-existing-id',
      }),
    ).rejects.toBeInstanceOf(ProductNotFoundError);
  });
});
