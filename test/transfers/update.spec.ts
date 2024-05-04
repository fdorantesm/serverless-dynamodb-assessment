import type { APIGatewayProxyEvent } from 'aws-lambda';
import { updateTransfer } from '../../src/transfers/update';

describe('updateTransfer', () => {
  it('should return a 200 response', async () => {
    const event: Partial<APIGatewayProxyEvent> = {
      pathParameters: {
        id: '1',
      },
    };
    const response = await updateTransfer(event as APIGatewayProxyEvent);
    expect(response.statusCode).toBe(200);
  });
});
