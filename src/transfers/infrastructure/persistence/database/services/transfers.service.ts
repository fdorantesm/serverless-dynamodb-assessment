import type { Repository } from '@/core/infrastructure/interfaces/repository.interface';
import type { TransfersService as ITransfersService } from '@/transfers/domain/contracts/transfers.service';
import { TransferEntity } from '@/transfers/domain/entities/transfer.entity';
import type { Transfer } from '@/transfers/domain/interfaces/transfer';

export class TransfersService implements ITransfersService {
  constructor(
    private readonly transferRepository: Repository<TransferEntity, Transfer>,
  ) {
    this.transferRepository = transferRepository;
  }

  async create(payload: Transfer): Promise<TransferEntity> {
    return this.transferRepository.create(payload);
  }

  async list(): Promise<TransferEntity[]> {
    return this.transferRepository.list();
  }

  async get(id: string): Promise<TransferEntity | null> {
    const transfer = await this.transferRepository.get(id);

    if (transfer) {
      return transfer;
    }

    return null;
  }

  async update(id: string, payload: Transfer): Promise<TransferEntity | null> {
    return this.transferRepository.update(id, payload);
  }

  async delete(id: string): Promise<void> {
    return this.transferRepository.delete(id);
  }

  async bulkCreate(payload: Transfer[]): Promise<TransferEntity[]> {
    return this.transferRepository.bulkCreate(payload);
  }

  async clear(): Promise<void> {
    return this.transferRepository.clear();
  }
}
