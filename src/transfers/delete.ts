import { Response } from '../utils/response';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const middy = require('middy');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { httpErrorHandler, httpHeaderNormalizer } = require('middy/middlewares');

async function deleteTransfer(_event: any) {
  console.log('Deleting a transaction...');

  return new Response().setStatus(200).build();
}

export const handler = middy(deleteTransfer)
  .use(httpHeaderNormalizer())
  .use(httpErrorHandler());
