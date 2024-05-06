import { context } from '#/transfers/context';
import { transfers } from '#/transfers/mocks/transfers.mock';
import type { Context } from '@/core/infrastructure/types/context.type';
import { getTransfer } from '@/transfers/infrastructure/http/handlers/get-transfer';
import type { APIGatewayProxyEvent } from 'aws-lambda';

describe('getTransfer', () => {
  it('should return a 200 response', async () => {
    const event: Partial<APIGatewayProxyEvent> = {
      pathParameters: {
        id: 'C00001',
      },
    };

    const transfer = transfers.at(0)!;

    context.services.transferService.create(transfer);

    const response = await getTransfer(
      event as APIGatewayProxyEvent,
      context as unknown as Context,
    );

    expect(response.body).toBeDefined();
    const body = JSON.parse(response.body!);
    expect(body.data.id).toBe('C00001');
    expect(response.statusCode).toBe(200);
  });
});
