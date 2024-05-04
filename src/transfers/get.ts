import { Response } from '../utils/response';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const middy = require('middy');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { httpErrorHandler, httpHeaderNormalizer } = require('middy/middlewares');

async function getTransfer(_event: any) {
  console.log('Reading one transaction...');

  return new Response().setStatus(200).setBody({}).build();
}

export const handler = middy(getTransfer)
  .use(httpHeaderNormalizer())
  .use(httpErrorHandler());
