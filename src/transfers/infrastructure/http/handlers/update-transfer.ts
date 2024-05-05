import type { APIGatewayProxyEvent } from 'aws-lambda';
import { Response } from '../../../../utils/response';
import type { Context } from '@/core/infrastructure/types/context.type';
import { injectorMiddleware } from '@/core/infrastructure/middlewares/injector.middleware';
import { validationMiddleware } from '@/core/infrastructure/middlewares/validator.middleware';
import { UpdateTransferDto } from '@/transfers/infrastructure/http/dtos/update-transfer.dto';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const middy = require('middy');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { httpErrorHandler, httpHeaderNormalizer } = require('middy/middlewares');

export async function updateTransfer(
  event: APIGatewayProxyEvent,
  context: Context,
) {
  const id = event.pathParameters!.id;
  const body = JSON.parse(event.body!);
  const { transferService } = context.services;
  const transferExist = await transferService.get(id!);

  if (!transferExist) {
    return new Response()
      .setStatus(404)
      .setMessage('Transfer not found')
      .build();
  }

  const transfer = await transferService.update(id!, body);

  return new Response()
    .setStatus(200)
    .setMessage('Transfer updated')
    .setBody(transfer.toJson())
    .build();
}

export const handler = middy(updateTransfer)
  .use(validationMiddleware(UpdateTransferDto))
  .use(injectorMiddleware())
  .use(httpHeaderNormalizer())
  .use(httpErrorHandler());
