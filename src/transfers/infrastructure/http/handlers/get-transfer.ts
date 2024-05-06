import type { APIGatewayProxyEvent } from 'aws-lambda';
import { Response } from '@/utils/response';
import type { Context } from '@/core/infrastructure/types/context.type';
import { injectorMiddleware } from '@/core/infrastructure/middlewares/injector.middleware';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const middy = require('middy');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { httpErrorHandler, httpHeaderNormalizer } = require('middy/middlewares');

export async function getTransfer(
  event: APIGatewayProxyEvent,
  context: Context,
) {
  const id = event.pathParameters!.id;

  const { transferService } = context.services;

  const transfer = await transferService.get(id!);

  if (!transfer) {
    return new Response()
      .setStatus(404)
      .setMessage('Transfer not found')
      .build();
  }

  return new Response().setStatus(200).setBody(transfer.toJson()).build();
}

export const handler = middy(getTransfer)
  .use(injectorMiddleware())
  .use(httpHeaderNormalizer())
  .use(httpErrorHandler());
