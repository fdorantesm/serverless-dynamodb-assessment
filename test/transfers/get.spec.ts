import type { APIGatewayProxyEvent } from 'aws-lambda';
import { getTransfer } from '../../src/transfers/get';

describe('getTransfer', () => {
  it('should return a 200 response', async () => {
    const event: Partial<APIGatewayProxyEvent> = {
      pathParameters: {
        id: '1',
      },
    };
    const response = await getTransfer(event as APIGatewayProxyEvent);

    expect(response.body).toBeDefined();
    const body = JSON.parse(response.body!);
    expect(body.data.id).toBe('1');
    expect(response.statusCode).toBe(200);
  });
});
