import { context } from '#/transfers/context';
import { transfers } from '#/transfers/mocks/transfers.mock';
import type { Context } from '@/core/infrastructure/types/context.type';
import { deleteTransfer } from '@/transfers/infrastructure/http/handlers/delete-transfer';
import type { APIGatewayProxyEvent } from 'aws-lambda';

describe('deleteTransfer', () => {
  beforeEach(() => {
    context.services.transferService.clear();
  });

  it('should return a 204 response', async () => {
    const transfer = transfers.at(0)!;
    const event: Partial<APIGatewayProxyEvent> = {
      pathParameters: {
        id: 'C00001',
      },
      body: JSON.stringify({
        ...transfer,
        inUse: true,
      }),
    };

    await context.services.transferService.create(transfers.at(0)!);

    const response = await deleteTransfer(
      event as APIGatewayProxyEvent,
      context as unknown as Context,
    );

    expect(response.statusCode).toBe(204);
  });

  it('should return a 404 response', async () => {
    const event: Partial<APIGatewayProxyEvent> = {
      pathParameters: {
        id: 'C00001',
      },
      body: JSON.stringify({
        inUse: true,
      }),
    };

    const response = await deleteTransfer(
      event as APIGatewayProxyEvent,
      context as unknown as Context,
    );

    expect(response.statusCode).toBe(404);
  });
});
