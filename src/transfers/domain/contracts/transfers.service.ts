import type { TransferEntity } from '@/transfers/domain/entities/transfer.entity';
import type { Transfer } from '@/transfers/domain/interfaces/transfer';

export interface TransfersService {
  create(payload: Transfer): Promise<TransferEntity | null>;
  list(filter?: any): Promise<TransferEntity[]>;
  get(id: string): Promise<TransferEntity | null>;
  update(id: string, payload: Transfer): Promise<TransferEntity | null>;
  delete(id: string): Promise<void>;
  bulkCreate(payload: Transfer[]): Promise<void>;
  clear(): Promise<void>;
}
