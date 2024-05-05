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
  console.log(context.services);
  const { transferService } = context.services;

  const transfers = await transferService.list();

  console.log('Transfers:', transfers);

  return new Response().setStatus(200).setBody(transfers).build();
}

export const handler = middy(listTransfers)
  .use(injectorMiddleware())
  .use(httpHeaderNormalizer())
  .use(httpErrorHandler());
