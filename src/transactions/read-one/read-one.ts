export function handler(event: any = {}): any {
  console.log('Reading one transaction...');
  return { statusCode: 200, body: JSON.stringify({ message: 'Read one' }) };
}