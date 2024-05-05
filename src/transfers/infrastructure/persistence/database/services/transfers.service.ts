import type { Repository } from '@/core/infrastructure/interfaces/repository.interface';
import { TransferEntity } from '@/transfers/domain/entities/transfer.entity';
import type { Transfer } from '@/transfers/domain/interfaces/transfer';

export class TransfersService {
  constructor(private readonly transferRepository: Repository<Transfer>) {
    this.transferRepository = transferRepository;
  }

  async create(payload: Transfer): Promise<TransferEntity> {
    const transfer = await this.transferRepository.create(payload);
    return TransferEntity.create(transfer);
  }

  async list(): Promise<TransferEntity[]> {
    const transfers = await this.transferRepository.list();
    return transfers.map((transfer) => TransferEntity.create(transfer));
  }

  async get(id: string): Promise<TransferEntity> {
    const transfer = await this.transferRepository.get(id);
    return TransferEntity.create(transfer);
  }

  async update(id: string, payload: Transfer): Promise<TransferEntity> {
    const transfer = await this.transferRepository.update(id, payload);
    return TransferEntity.create(transfer);
  }

  async delete(id: string): Promise<void> {
    return this.transferRepository.delete(id);
  }

  async bulkCreate(payload: Transfer[]): Promise<TransferEntity[]> {
    const transfers = await this.transferRepository.bulkCreate(payload);
    return transfers.map((transfer) => TransferEntity.create(transfer));
  }
}
