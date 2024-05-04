import { Response } from '../utils/response';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const middy = require('middy');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { httpErrorHandler, httpHeaderNormalizer } = require('middy/middlewares');

async function createTransfer(_event: any) {
  console.log('Create one transfer...');

  return new Response().setBody({}).setStatus(201).build();
}

export const handler = middy(createTransfer)
  .use(httpHeaderNormalizer())
  .use(httpErrorHandler());
