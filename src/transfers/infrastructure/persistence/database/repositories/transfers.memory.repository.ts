import type { Repository } from '@/core/infrastructure/interfaces/repository.interface';
import { TransferEntity } from '@/transfers/domain/entities/transfer.entity';
import type { Transfer } from '@/transfers/domain/interfaces/transfer';
import type Datastore = require('nedb-promises');

export class TransfersMemoryRepository
  implements Repository<TransferEntity, Transfer>
{
  constructor(private readonly model: Datastore<Transfer>) {}

  async create(payload: Transfer): Promise<TransferEntity> {
    const transfer = await this.model.insert(payload);
    return TransferEntity.create(transfer);
  }

  async list(): Promise<TransferEntity[]> {
    const transfers = await this.model.find({});
    return transfers.map((transfer: Transfer) =>
      TransferEntity.create(transfer),
    );
  }

  async get(id: string): Promise<TransferEntity | null> {
    const transfer = await this.model.findOne({ id });
    if (transfer) {
      return TransferEntity.create(transfer);
    }

    return null;
  }

  async update(id: string, item: Transfer): Promise<TransferEntity | null> {
    const transfer = await this.model.update({ id }, item, {
      returnUpdatedDocs: true,
    });

    if (transfer) {
      return TransferEntity.create(transfer);
    }

    return null;
  }

  async delete(id: string): Promise<void> {
    this.model.deleteOne({ id }, { multi: false });
  }

  async bulkCreate(items: Transfer[]): Promise<TransferEntity[]> {
    const transfers = await this.model.insertMany(items);
    return transfers.map((transfer: Transfer) =>
      TransferEntity.create(transfer),
    );
  }

  async clear(): Promise<void> {
    this.model.remove({}, { multi: true });
  }
}
