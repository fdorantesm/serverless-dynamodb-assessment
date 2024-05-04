import { createTransfer } from '../../src/transfers/create';

describe('createTransfer', () => {
  it('should return a 201 response', async () => {
    const event = {};
    const response = await createTransfer(event);
    expect(response.statusCode).toBe(201);
  });
});
