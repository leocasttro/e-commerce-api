import { UniqueEntityId } from '../../../../../shared/domain/value-objects/UniqueEntityId';
import { Product } from '../../../domain/entities/Product';
import { ProductNotFoundError } from '../../../domain/errors/ProductNotFoundError';
import { InMemoryProductRepository } from '../../../tests/repositories/InMemoryProductRepository';
import { DeleteProductUseCase } from './DeleteProductUseCase';

describe('Excluir produto', () => {
  let productRepository: InMemoryProductRepository;
  let deleteProductUseCase: DeleteProductUseCase;

  beforeEach(() => {
    productRepository = new InMemoryProductRepository();
    deleteProductUseCase = new DeleteProductUseCase(productRepository);
  });

  it('deve excluir um produto', async () => {
    const product = await productRepository.create(
      Product.create({
        name: 'Notebook Dell',
        price: 3500,
        stock: 5,
        categoryId: new UniqueEntityId(),
      }),
    );

    await deleteProductUseCase.execute({
      id: product.id.toString(),
    });

    expect(productRepository.items).toHaveLength(0);
  });

  it('nao deve excluir um produto inexistente', async () => {
    await expect(
      deleteProductUseCase.execute({
        id: 'non-existing-id',
      }),
    ).rejects.toBeInstanceOf(ProductNotFoundError);
  });
});
