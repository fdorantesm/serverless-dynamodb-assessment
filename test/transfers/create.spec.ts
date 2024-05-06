import { context } from '#/transfers/context';
import { transfers } from '#/transfers/mocks/transfers.mock';
import type { Context } from '@/core/infrastructure/types/context.type';
import { createTransfer } from '@/transfers/infrastructure/http/handlers/create-transfer';
import type { APIGatewayProxyEvent } from 'aws-lambda';

describe('createTransfer', () => {
  it('should return a 201 response', async () => {
    const event = {
      body: JSON.stringify(transfers.at(0)!),
    };

    const response = await createTransfer(
      event as APIGatewayProxyEvent,
      context as unknown as Context,
    );

    const body = JSON.parse(response.body!);

    expect(response.body).toBeDefined();
    expect(response.statusCode).toBe(201);
    expect(body.data.id).toBe('C00001');
  });
});
