import type { APIGatewayProxyEvent } from 'aws-lambda';
import { Response } from '@/utils/response';
import type { Context } from '@/core/infrastructure/types/context.type';
import { injectorMiddleware } from '@/core/infrastructure/middlewares/injector.middleware';
import { validationMiddleware } from '@/core/infrastructure/middlewares/validator.middleware';
import { RestoreTransfersBackupDto } from '@/transfers/infrastructure/http/dtos/restore-transfers-backup';
import { getS3Config } from '@/core/infrastructure/config/s3.config';
import type { Transfer } from '@/transfers/domain/interfaces/transfer';
import { removeKeys } from '@/utils/object';
import PromisePool from '@supercharge/promise-pool';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const middy = require('middy');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { httpErrorHandler, httpHeaderNormalizer } = require('middy/middlewares');

export async function restoreBackup(
  event: APIGatewayProxyEvent,
  context: Context,
) {
  const body = JSON.parse(event.body!);
  const { transferService } = context.services;
  const { s3Service } = context.services;
  const { s3 } = getS3Config();

  try {
    const backup = await s3Service.getObject(s3.bucket, body.backup);
    const data = JSON.parse(backup);

    const fixedData = data.map((transfer: Transfer) => {
      if (transfer.validatedAt === null) {
        return removeKeys(transfer, ['validatedAt']);
      }

      return transfer;
    });

    const { results } = await PromisePool.withConcurrency(10)
      .for(fixedData)
      .process(async (item: Transfer) => {
        try {
          const transfer = await transferService.create(item);
          if (!transfer) {
            throw new Error('Transfer not created');
          }

          return transfer.toJson();
        } catch (error) {
          return {
            item,
            error: error.message,
          };
        }
      });

    const transfers = results.filter(
      (result: Transfer & { error: string }) => !result.error,
    );

    const errors = results.filter(
      (result: Transfer & { error: string }) => result.error,
    );

    return new Response()
      .setStatus(200)
      .setBody({
        transfers,
        errors,
      })
      .build();
  } catch (error) {
    console.error('Error:', error);
    const response = new Response();
    switch (error.Code) {
      case 'NoSuchKey': {
        return response.setStatus(404).setMessage('Backup not found').build();
      }
      default: {
        return response
          .setStatus(500)
          .setMessage('Internal server error')
          .build();
      }
    }
  }
}

export const handler = middy(restoreBackup)
  .use(validationMiddleware(RestoreTransfersBackupDto))
  .use(injectorMiddleware())
  .use(httpHeaderNormalizer())
  .use(httpErrorHandler());
