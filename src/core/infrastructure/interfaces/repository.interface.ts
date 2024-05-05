export interface Repository<T> {
  create(item: T): T | Promise<T>;
  list(): T[] | Promise<T[]>;
  get(id: string): T | Promise<T>;
  update(id: string, item: T): T | Promise<T>;
  delete(id: string): void | Promise<void>;
  bulkCreate(items: T[]): T[] | Promise<T[]>;
}
