import type { HandlerLambda } from 'middy'; // Import the 'Context' type
import type { Context } from '@/core/infrastructure/types/context.type';
import { Transfer } from '@/transfers/infrastructure/persistence/database/models/transfer.model';
import { TransferRepository } from '@/transfers/infrastructure/persistence/database/repositories/transfers.repository';
import { S3Service } from '@/shared/infrastructure/storage/s3.service';
import { getS3Config } from '@/core/infrastructure/config/s3.config';
import type { S3ClientConfig } from '@aws-sdk/client-s3';
import { TransferService } from '@/transfers/infrastructure/persistence/database/services/transfers.service';

export const injectorMiddleware = () => {
  return {
    before: async (handler: HandlerLambda & { context: Context }) => {
      const { s3 } = getS3Config();

      const s3Settings: S3ClientConfig = {
        region: s3.region,
        credentials: {
          accessKeyId: s3.accessKeyId,
          secretAccessKey: s3.secretAccessKey,
        },
      };

      handler.context.services = {
        s3Service: new S3Service(s3Settings),
        transferService: new TransferService(new TransferRepository(Transfer)),
      };
    },
  };
};
