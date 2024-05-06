import { S3MemoryService } from '@/shared/infrastructure/storage/s3.memory.service';
import { TransfersMemoryRepository } from '@/transfers/infrastructure/persistence/database/repositories/transfers.memory.repository';
import { TransfersService } from '@/transfers/infrastructure/persistence/database/services/transfers.service';
import DataStore = require('nedb-promises');

export const context = {
  services: {
    transferService: new TransfersService(
      new TransfersMemoryRepository(DataStore.create()),
    ),
    s3Service: new S3MemoryService(),
  },
};
