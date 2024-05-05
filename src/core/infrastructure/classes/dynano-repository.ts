import type { Repository } from '@/core/infrastructure/interfaces/repository.interface';
import type { ModelType } from 'dynamoose/dist/General';

export class DynamoRepository implements Repository<any> {
  protected model: ModelType<any>;

  constructor(model: ModelType<any>) {
    this.model = model;
  }

  public create(item: any) {
    return this.model.create(item);
  }

  public list() {
    return this.model.scan().all().exec();
  }

  public get(id: string) {
    return this.model.get({ id });
  }

  public update(id: string, item: any) {
    return this.model.update({ id }, item);
  }

  public delete(id: string) {
    this.model.delete({ id });
  }

  public bulkCreate(items: any[]) {
    return this.model.batchPut(items);
  }
}
