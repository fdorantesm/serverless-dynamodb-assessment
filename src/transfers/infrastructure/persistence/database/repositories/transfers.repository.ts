import { DynamoRepository } from '@/core/infrastructure/classes/dynano-repository';
import { TransferEntity } from '@/transfers/domain/entities/transfer.entity';
import type { Transfer } from '@/transfers/domain/interfaces/transfer';
import type { ModelType } from 'dynamoose/dist/General';
import type { AnyItem } from 'dynamoose/dist/Item';

export class TransferRepository extends DynamoRepository<
  Transfer,
  TransferEntity
> {
  constructor(model: ModelType<AnyItem>) {
    super(model, TransferEntity);
  }
}
