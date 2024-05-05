import type { S3Service } from '@/shared/infrastructure/storage/s3.service';
import type { TransfersService } from '@/transfers/infrastructure/persistence/database/services/transfers.service';
import { Context as LambdaContext } from 'aws-lambda';

export type Context = LambdaContext & {
  services: {
    s3Service: S3Service;
    transferService: TransfersService;
  };
};
