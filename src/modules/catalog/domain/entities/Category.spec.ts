import { ValidationError } from '../../../../shared/domain/errors/ValidationError';
import { Category } from './Category';

describe('Categoria', () => {
  it('deve criar uma categoria com nome normalizado', () => {
    const category = Category.create({
      name: '  Eletronicos  ',
    });

    expect(category.id).toBeDefined();
    expect(category.name).toBe('Eletronicos');
    expect(category.createdAt).toBeInstanceOf(Date);
    expect(category.updatedAt).toBeInstanceOf(Date);
  });

  it('nao deve criar uma categoria com nome vazio', () => {
    expect(() =>
      Category.create({
        name: '   ',
      }),
    ).toThrow(ValidationError);
  });
});
