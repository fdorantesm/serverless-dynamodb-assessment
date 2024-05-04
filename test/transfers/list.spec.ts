import { listTransfers } from '../../src/transfers/list';

describe('listTransfers', () => {
  it('should return a 200 response', async () => {
    const event = {};
    const response = await listTransfers(event);
    expect(response.statusCode).toBe(200);
  });
});
