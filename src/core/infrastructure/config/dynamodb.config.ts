export function getDynamoDbConfig() {
  return {
    dynamodb: {
      accessKeyId: process.env.DYNAMODB_AWS_KEY || '',
      secretAccessKey: process.env.DYNAMODB_AWS_SECRET_KEY || '',
      region: process.env.DYNAMODB_AWS_REGION || '',
    },
  };
}
