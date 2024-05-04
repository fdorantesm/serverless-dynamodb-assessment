import type { APIGatewayProxyEvent } from 'aws-lambda';
import { Response } from '../utils/response';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const middy = require('middy');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { httpErrorHandler, httpHeaderNormalizer } = require('middy/middlewares');

export async function deleteTransfer(event: APIGatewayProxyEvent) {
  const id = event.pathParameters!.id;

  console.log(`Deleting transfer with id ${id}`);

  return new Response().setStatus(200).build();
}

export const handler = middy(deleteTransfer)
  .use(httpHeaderNormalizer())
  .use(httpErrorHandler());
