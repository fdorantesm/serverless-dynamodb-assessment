export function handler(event: any = {}): any {
  console.log('Deleting a transaction...');
  return { statusCode: 200, body: JSON.stringify({ message: 'Delete' }) };
}