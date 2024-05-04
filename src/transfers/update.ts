import { Response } from '../utils/response';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const middy = require('middy');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { httpErrorHandler, httpHeaderNormalizer } = require('middy/middlewares');

async function updateTransfer(_event: any) {
  console.log('Updating a transaction...');

  return new Response().setStatus(200).build();
}

export const handler = middy(updateTransfer)
  .use(httpHeaderNormalizer())
  .use(httpErrorHandler());
