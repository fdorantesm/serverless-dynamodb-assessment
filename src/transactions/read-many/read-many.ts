export function handler(event: any = {}): any {
  console.log('Reading many transactions...');
  return { statusCode: 200, body: JSON.stringify({ message: 'Read many' }) };
}