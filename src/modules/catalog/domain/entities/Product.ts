import { UniqueEntityId } from '../../../../shared/domain/value-objects/UniqueEntityId';
import { ValidationError } from '../../../../shared/domain/errors/ValidationError';

interface ProductProps {
  name: string;
  description: string | null;
  price: number;
  stock: number;
  categoryId: UniqueEntityId;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Product {
  public readonly id: UniqueEntityId;
  private props: ProductProps;

  private constructor(props: ProductProps, id?: UniqueEntityId) {
    this.id = id ?? new UniqueEntityId();

    this.props = {
      ...props,
      name: Product.validateName(props.name),
      description: Product.normalizeDescription(props.description),
      price: Product.validatePrice(props.price),
      stock: Product.validateStock(props.stock),
      createdAt: props.createdAt ?? new Date(),
      updatedAt: props.updatedAt ?? new Date(),
    };
  }

  static create(props: ProductProps, id?: UniqueEntityId) {
    return new Product(props, id);
  }

  get name() {
    return this.props.name;
  }

  get description(): string | null {
    return this.props.description ?? null;
  }

  get price(): number {
    return this.props.price;
  }

  get stock(): number {
    return this.props.stock;
  }

  get categoryId(): UniqueEntityId {
    return this.props.categoryId;
  }

  get createdAt(): Date {
    return this.props.createdAt!;
  }

  get updatedAt(): Date {
    return this.props.updatedAt!;
  }

  update(data: {
    name?: string;
    description?: string | null;
    price?: number;
    stock?: number;
    categoryId?: UniqueEntityId;
  }): void {
    if (data.name !== undefined) {
      this.props.name = Product.validateName(data.name);
    }

    if (data.description !== undefined) {
      this.props.description = Product.normalizeDescription(data.description);
    }

    if (data.price !== undefined) {
      this.props.price = Product.validatePrice(data.price);
    }

    if (data.stock !== undefined) {
      this.props.stock = Product.validateStock(data.stock);
    }

    if (data.categoryId !== undefined) {
      this.props.categoryId = data.categoryId;
    }

    this.touch();
  }

  private touch(): void {
    this.props.updatedAt = new Date();
  }

  private static validateName(name: string): string {
    const normalizedName = name.trim();

    if (!normalizedName) {
      throw new ValidationError('O nome do produto é obrigatório.');
    }

    return normalizedName;
  }

  private static normalizeDescription(description?: string | null): string | null {
    if (description === undefined || description === null) {
      return null;
    }

    const normalizedDescription = description.trim();

    return normalizedDescription || null;
  }

  private static validatePrice(price: number): number {
    if (price <= 0) {
      throw new ValidationError('O preço do produto deve ser maior que zero.');
    }

    return price;
  }

  private static validateStock(stock: number): number {
    if (!Number.isInteger(stock)) {
      throw new ValidationError('O estoque do produto deve ser um número inteiro.');
    }

    if (stock < 0) {
      throw new ValidationError('O estoque do produto não pode ser negativo.');
    }

    return stock;
  }
}
