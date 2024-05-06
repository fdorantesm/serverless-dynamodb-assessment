import { context } from '#/transfers/context';
import { transfers } from '#/transfers/mocks/transfers.mock';
import type { Context } from '@/core/infrastructure/types/context.type';
import { updateTransfer } from '@/transfers/infrastructure/http/handlers/update-transfer';
import type { APIGatewayProxyEvent } from 'aws-lambda';

describe('updateTransfer', () => {
  beforeEach(() => {
    context.services.transferService.clear();
  });

  it('should return a 200 response', async () => {
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

    const response = await updateTransfer(
      event as APIGatewayProxyEvent,
      context as unknown as Context,
    );

    expect(response.statusCode).toBe(200);
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

    const response = await updateTransfer(
      event as APIGatewayProxyEvent,
      context as unknown as Context,
    );

    expect(response.statusCode).toBe(404);
  });
});
