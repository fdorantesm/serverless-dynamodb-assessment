import { Response } from '../utils/response';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const middy = require('middy');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { httpErrorHandler, httpHeaderNormalizer } = require('middy/middlewares');

async function listTransfers(_event: any) {
  console.log('Reading list transactions...');

  return new Response().setStatus(200).setBody([]).build();
}

export const handler = middy(listTransfers)
  .use(httpHeaderNormalizer())
  .use(httpErrorHandler());
