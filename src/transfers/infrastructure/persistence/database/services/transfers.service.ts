import type { Repository } from '@/core/infrastructure/interfaces/repository.interface';
import type { Transfer } from '@/transfers/domain/interfaces/transfer';

export class TransferService {
  constructor(private readonly transferRepository: Repository<Transfer>) {
    this.transferRepository = transferRepository;
  }

  async create(transfer: Transfer) {
    return this.transferRepository.create(transfer);
  }

  async list(): Promise<Transfer[]> {
    return this.transferRepository.list();
  }

  async get(id: string): Promise<Transfer> {
    return this.transferRepository.get(id);
  }

  async update(id: string, transfer: Transfer): Promise<Transfer> {
    return this.transferRepository.update(id, transfer);
  }

  async delete(id: string): Promise<void> {
    return this.transferRepository.delete(id);
  }

  async bulkCreate(transfers: Transfer[]): Promise<Transfer[]> {
    return this.transferRepository.bulkCreate(transfers);
  }
}
