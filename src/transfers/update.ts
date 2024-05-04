import type { APIGatewayProxyEvent } from 'aws-lambda';
import { Response } from '../utils/response';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const middy = require('middy');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { httpErrorHandler, httpHeaderNormalizer } = require('middy/middlewares');

export async function updateTransfer(event: APIGatewayProxyEvent) {
  const id = event.pathParameters!.id;

  console.log(`Updating transfer with id ${id}`);

  return new Response()
    .setStatus(200)
    .setMessage('Transfer updated')
    .setBody({
      id,
    })
    .build();
}

export const handler = middy(updateTransfer)
  .use(httpHeaderNormalizer())
  .use(httpErrorHandler());
