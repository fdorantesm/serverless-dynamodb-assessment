import type { S3Service } from '@/shared/domain/contracts/s3.service';
import type { TransfersService } from '@/transfers/domain/contracts/transfers.service';
import { Context as LambdaContext } from 'aws-lambda';

export type Context = LambdaContext & {
  services: {
    s3Service: S3Service;
    transferService: TransfersService;
  };
};
