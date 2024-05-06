import type { APIGatewayProxyEvent } from 'aws-lambda';
import { listTransfers } from '@/transfers/infrastructure/http/handlers/list-transfers';
import type { Context } from '@/core/infrastructure/types/context.type';
import { context } from '#/transfers/context';

describe('listTransfers', () => {
  it('should return a 200 response', async () => {
    const event = {};

    const response = await listTransfers(
      event as APIGatewayProxyEvent,
      context as unknown as Context,
    );

    expect(response.statusCode).toBe(200);
  });
});
