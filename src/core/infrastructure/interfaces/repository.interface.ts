export interface Repository<E, I> {
  create(item: I): Promise<E>;
  list(): Promise<E[]>;
  get(id: string): Promise<E | null>;
  update(id: string, item: I): Promise<E | null>;
  delete(id: string): Promise<void>;
  bulkCreate(items: I[]): Promise<E[]>;
  clear(): Promise<void>;
}
