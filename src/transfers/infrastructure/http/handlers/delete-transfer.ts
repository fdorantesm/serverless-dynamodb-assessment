import type { APIGatewayProxyEvent } from 'aws-lambda';
import { Response } from '@/utils/response';
import { injectorMiddleware } from '@/core/infrastructure/middlewares/injector.middleware';
import type { Context } from '@/core/infrastructure/types/context.type';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const middy = require('middy');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { httpErrorHandler, httpHeaderNormalizer } = require('middy/middlewares');

export async function deleteTransfer(
  event: APIGatewayProxyEvent,
  context: Context,
) {
  const id = event.pathParameters!.id;
  const { transferService } = context.services;
  const transferExist = await transferService.get(id!);

  console.log('Transfer exist:', transferExist);

  if (!transferExist) {
    return new Response()
      .setStatus(404)
      .setMessage('Transfer not found')
      .build();
  }

  await transferService.delete(id!);

  return new Response().setStatus(204).build();
}

export const handler = middy(deleteTransfer)
  .use(injectorMiddleware())
  .use(httpHeaderNormalizer())
  .use(httpErrorHandler());
