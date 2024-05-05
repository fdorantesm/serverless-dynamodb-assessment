import { DynamoRepository } from '@/core/infrastructure/classes/dynano-repository';
import type { ModelType } from 'dynamoose/dist/General';
import type { AnyItem } from 'dynamoose/dist/Item';

export class TransferRepository extends DynamoRepository {
  constructor(model: ModelType<AnyItem>) {
    super(model);
  }
}
