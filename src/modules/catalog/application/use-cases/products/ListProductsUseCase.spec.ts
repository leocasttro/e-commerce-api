import { ValidationError } from '../../../../../shared/domain/errors/ValidationError';
import { UniqueEntityId } from '../../../../../shared/domain/value-objects/UniqueEntityId';
import { Product } from '../../../domain/entities/Product';
import { InMemoryProductRepository } from '../../../tests/repositories/InMemoryProductRepository';
import { ListProductsUseCase } from './ListProductsUseCase';

describe('Listar produtos', () => {
  let productRepository: InMemoryProductRepository;
  let listProductsUseCase: ListProductsUseCase;
  let categoryId: UniqueEntityId;

  beforeEach(() => {
    productRepository = new InMemoryProductRepository();
    listProductsUseCase = new ListProductsUseCase(productRepository);
    categoryId = new UniqueEntityId();
  });

  it('deve listar produtos com paginacao padrao', async () => {
    await productRepository.create(
      Product.create({
        name: 'Notebook Dell',
        price: 3500,
        stock: 5,
        categoryId,
      }),
    );

    const result = await listProductsUseCase.execute({});

    expect(result.data).toHaveLength(1);
    expect(result.meta.page).toBe(1);
    expect(result.meta.limit).toBe(10);
  });

  it('deve filtrar produtos por categoria', async () => {
    const otherCategoryId = new UniqueEntityId();
    await productRepository.create(
      Product.create({
        name: 'Notebook Dell',
        price: 3500,
        stock: 5,
        categoryId,
      }),
    );
    await productRepository.create(
      Product.create({
        name: 'Cadeira Gamer',
        price: 1200,
        stock: 2,
        categoryId: otherCategoryId,
      }),
    );

    const result = await listProductsUseCase.execute({
      categoryId: categoryId.toString(),
    });

    expect(result.data).toHaveLength(1);
    expect(result.data[0].name).toBe('Notebook Dell');
  });

  it('deve filtrar produtos por faixa de preco', async () => {
    await productRepository.create(
      Product.create({
        name: 'Notebook Dell',
        price: 3500,
        stock: 5,
        categoryId,
      }),
    );
    await productRepository.create(
      Product.create({
        name: 'Mouse',
        price: 100,
        stock: 10,
        categoryId,
      }),
    );

    const result = await listProductsUseCase.execute({
      priceMin: 1000,
      priceMax: 4000,
    });

    expect(result.data).toHaveLength(1);
    expect(result.data[0].name).toBe('Notebook Dell');
  });

  it('deve buscar produtos por nome parcial sem diferenciar maiusculas e minusculas', async () => {
    await productRepository.create(
      Product.create({
        name: 'Notebook Dell',
        price: 3500,
        stock: 5,
        categoryId,
      }),
    );

    const result = await listProductsUseCase.execute({
      name: 'note',
    });

    expect(result.data).toHaveLength(1);
  });

  it('nao deve listar produtos com faixa de preco invalida', async () => {
    await expect(
      listProductsUseCase.execute({
        priceMin: 5000,
        priceMax: 1000,
      }),
    ).rejects.toBeInstanceOf(ValidationError);
  });
});
