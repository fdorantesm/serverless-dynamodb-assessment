import type { APIGatewayProxyEvent } from 'aws-lambda';
import { deleteTransfer } from '../../src/transfers/delete';

describe('deleteTransfer', () => {
  it('should return a 204 response', async () => {
    const event: Partial<APIGatewayProxyEvent> = {
      pathParameters: {
        id: '1',
      },
    };
    const response = await deleteTransfer(event as APIGatewayProxyEvent);
    expect(response.statusCode).toBe(204);
  });
});
