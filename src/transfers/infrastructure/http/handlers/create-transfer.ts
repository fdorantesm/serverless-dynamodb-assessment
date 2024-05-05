import { injectorMiddleware } from '@/core/infrastructure/middlewares/injector.middleware';
import { validationMiddleware } from '@/core/infrastructure/middlewares/validator.middleware';
import type { Context } from '@/core/infrastructure/types/context.type';
import { CreateTransferDto } from '@/transfers/infrastructure/http/dtos/create-transfer.dto';
import { Response } from '@/utils/response';
import type { APIGatewayProxyEvent } from 'aws-lambda';
import { v4 as uuid } from 'uuid';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const middy = require('middy');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { httpErrorHandler, httpHeaderNormalizer } = require('middy/middlewares');

export async function createTransfer(
  event: APIGatewayProxyEvent,
  context: Context,
) {
  console.log('Create one transfer...');

  const { transferService } = context.services;
  const body = JSON.parse(event.body!);
  const now = new Date().toISOString();

  const transfer = await transferService.create({
    id: uuid(),
    ...body,
    validatedAt: now,
    createdAt: now,
    updatedAt: now,
  });

  return new Response()
    .setBody(transfer)
    .setStatus(201)
    .setMessage('Transfer created')
    .build();
}

export const handler = middy(createTransfer)
  .use(validationMiddleware(CreateTransferDto))
  .use(injectorMiddleware())
  .use(httpHeaderNormalizer())
  .use(httpErrorHandler());
