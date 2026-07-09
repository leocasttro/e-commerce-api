import crypto from 'node:crypto';

export class UniqueEntityId {
  private readonly value: string;

  constructor(value?: string) {
    this.value = value ?? crypto.randomUUID();
  }

  toString(): string {
    return this.value;
  }

  equals(id: UniqueEntityId): boolean {
    return this.value === id.toString();
  }
}
