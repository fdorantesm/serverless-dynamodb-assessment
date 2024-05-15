import { DynamoRepository } from '@/core/infrastructure/classes/dynamo-repository';
import { TransferEntity } from '@/transfers/domain/entities/transfer.entity';
import type { Transfer } from '@/transfers/domain/interfaces/transfer';
import type { DynamoDB } from 'aws-sdk';

export class TransferRepository extends DynamoRepository<
  Transfer,
  TransferEntity
> {
  protected static readonly tableName = 'Transfers';

  constructor(readonly db: DynamoDB) {
    super(db, TransferRepository.tableName, TransferEntity);
  }
}
