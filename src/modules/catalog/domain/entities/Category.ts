import { UniqueEntityId } from '../../../../shared/domain/value-objects/UniqueEntityId';
import { ValidationError } from '../../../../shared/domain/errors/ValidationError';

interface CategoryProps {
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Category {
  private readonly _id: UniqueEntityId;
  private props: CategoryProps;

  private constructor(props: CategoryProps, id?: UniqueEntityId) {
    this._id = id ?? new UniqueEntityId();
    this.props = {
      ...props,
      name: Category.validateName(props.name),
      createdAt: props.createdAt ?? new Date(),
      updatedAt: props.updatedAt ?? new Date(),
    };
  }

  static create(props: CategoryProps, id?: UniqueEntityId) {
    return new Category(props, id);
  }

  get id(): UniqueEntityId {
    return this._id;
  }

  get name(): string {
    return this.props.name;
  }

  get createdAt(): Date {
    return this.props.createdAt!;
  }

  get updatedAt(): Date {
    return this.props.updatedAt!;
  }

  updateName(name: string): void {
    this.props.name = Category.validateName(name);
    this.touch();
  }

  private touch(): void {
    this.props.updatedAt = new Date();
  }

  private static validateName(name: string): string {
    const normalizedName = name.trim();

    if (!normalizedName) {
      throw new ValidationError('O nome da categoria é obrigatório.');
    }
    return normalizedName;
  }
}
