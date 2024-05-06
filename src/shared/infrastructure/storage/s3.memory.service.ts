import { transfers } from '#/transfers/mocks/transfers.mock';
import type { S3Service } from '@/shared/domain/contracts/s3.service';

export class S3MemoryService implements S3Service {
  async getObject(_bucket: string, _key: string): Promise<string> {
    return JSON.stringify(transfers);
  }
}
