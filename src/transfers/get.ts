import type { APIGatewayProxyEvent } from 'aws-lambda';
import { Response } from '../utils/response';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const middy = require('middy');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { httpErrorHandler, httpHeaderNormalizer } = require('middy/middlewares');

export async function getTransfer(event: APIGatewayProxyEvent) {
  const id = event.pathParameters!.id;

  return new Response()
    .setStatus(200)
    .setBody({
      id,
    })
    .build();
}

export const handler = middy(getTransfer)
  .use(httpHeaderNormalizer())
  .use(httpErrorHandler());
