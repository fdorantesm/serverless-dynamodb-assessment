import type { APIGatewayProxyEvent } from 'aws-lambda';
import { Response } from '../../../../utils/response';
import type { Context } from '@/core/infrastructure/types/context.type';
import { injectorMiddleware } from '@/core/infrastructure/middlewares/injector.middleware';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const middy = require('middy');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { httpErrorHandler, httpHeaderNormalizer } = require('middy/middlewares');

export async function listTransfers(
  _event: APIGatewayProxyEvent,
  context: Context,
) {
  const { transferService } = context.services;

  try {
    const transfers = await transferService.list({});
    console.log('transfers', transfers);

    const data = transfers.map((transfer) => transfer.toJson());

    return new Response().setStatus(200).setBody(data).build();
  } catch (error) {
    console.log('herror', error.__type);
    return new Response().setStatus(500).setMessage(error.message).build();
  }
}

export const handler = middy(listTransfers)
  .use(injectorMiddleware())
  .use(httpHeaderNormalizer())
  .use(httpErrorHandler());
