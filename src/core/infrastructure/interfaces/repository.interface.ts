export interface Repository<E, I> {
  create(item: I): Promise<E | null>;
  list(): Promise<E[]>;
  get(id: string): Promise<E | null>;
  update(id: string, item: I): Promise<E | null>;
  delete(id: string): Promise<void>;
  bulkCreate(items: I[]): Promise<void>;
  clear(): Promise<void>;
}
