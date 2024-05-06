import { context } from '#/transfers/context';
import type { Context } from '@/core/infrastructure/types/context.type';
import { restoreBackup } from '@/transfers/infrastructure/http/handlers/restore-backup';
import type { APIGatewayProxyEvent } from 'aws-lambda';

describe('restoreBackup', () => {
  it('should return a 200 response', async () => {
    const event = {
      body: JSON.stringify({
        backup: 'backup',
      }),
    };

    const response = await restoreBackup(
      event as APIGatewayProxyEvent,
      context as unknown as Context,
    );
    const body = JSON.parse(response.body!);

    expect(response.statusCode).toBe(200);
    expect(body).toBeDefined();
    expect(body.data).toBeDefined();
  });
});
