import { ValidationError } from '../../../../shared/domain/errors/ValidationError';
import { UniqueEntityId } from '../../../../shared/domain/value-objects/UniqueEntityId';
import { Product } from './Product';

describe('Produto', () => {
  const categoryId = new UniqueEntityId();

  it('deve criar um produto com dados validos', () => {
    const product = Product.create({
      name: '  Notebook Dell  ',
      description: '  Notebook para trabalho  ',
      price: 3500,
      stock: 5,
      categoryId,
    });

    expect(product.id).toBeDefined();
    expect(product.name).toBe('Notebook Dell');
    expect(product.description).toBe('Notebook para trabalho');
    expect(product.price).toBe(3500);
    expect(product.stock).toBe(5);
    expect(product.categoryId.equals(categoryId)).toBe(true);
  });

  it('deve normalizar uma descricao vazia para null', () => {
    const product = Product.create({
      name: 'Mouse',
      description: '   ',
      price: 100,
      stock: 10,
      categoryId,
    });

    expect(product.description).toBeNull();
  });

  it('nao deve criar um produto com nome vazio', () => {
    expect(() =>
      Product.create({
        name: '   ',
        price: 100,
        stock: 10,
        categoryId,
      }),
    ).toThrow(ValidationError);
  });

  it('nao deve criar um produto com preco menor ou igual a zero', () => {
    expect(() =>
      Product.create({
        name: 'Mouse',
        price: 0,
        stock: 10,
        categoryId,
      }),
    ).toThrow(ValidationError);
  });

  it('nao deve criar um produto com estoque negativo', () => {
    expect(() =>
      Product.create({
        name: 'Mouse',
        price: 100,
        stock: -1,
        categoryId,
      }),
    ).toThrow(ValidationError);
  });

  it('nao deve criar um produto com estoque decimal', () => {
    expect(() =>
      Product.create({
        name: 'Mouse',
        price: 100,
        stock: 1.5,
        categoryId,
      }),
    ).toThrow(ValidationError);
  });
});
