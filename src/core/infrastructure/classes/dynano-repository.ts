import type { Entity } from '@/core/domain/classes/entity';
import type { Repository } from '@/core/infrastructure/interfaces/repository.interface';
import type { ModelType } from 'dynamoose/dist/General';

export class DynamoRepository<I extends { id: string }, E extends Entity<I>>
  implements Repository<E, I>
{
  protected model: ModelType<any>;

  constructor(
    model: ModelType<any>,
    private readonly entityClass: new (data: I) => E,
  ) {
    this.model = model;
  }

  public async create(item: any) {
    const doc = await this.model.create(item);
    return this.mapToEntity(doc as I);
  }

  public async list() {
    const docs = await this.model.scan().all().exec();
    return docs.map((doc: I) => this.mapToEntity(doc));
  }

  public async get(id: string): Promise<E | null> {
    const doc = await this.model.get({ id });
    if (doc) {
      return this.mapToEntity(doc as I);
    }

    return null;
  }

  public async update(id: string, item: any) {
    const doc = await this.model.update({ id }, item);
    if (doc) {
      return this.mapToEntity(doc as I);
    }

    return null;
  }

  public async delete(id: string): Promise<void> {
    this.model.delete({ id });
  }

  public async bulkCreate(items: any[]) {
    const docs = await this.model.batchPut(items);
    return docs.map((doc: I) => this.mapToEntity(doc));
  }

  public async clear() {
    return this.model.batchDelete();
  }

  private mapToEntity(data: I): E {
    return new this.entityClass(data);
  }
}
