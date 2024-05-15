import { getDynamoDbConfig } from '@/core/infrastructure/config/dynamodb.config';
import { DynamoDB } from 'aws-sdk';

export class DynamoClient {
  private static instance: DynamoDB;

  private constructor() {
    const { dynamodb: config } = getDynamoDbConfig();
    console.log('config', config);
    DynamoClient.instance = new DynamoDB({
      credentials: {
        accessKeyId: config.accessKeyId,
        secretAccessKey: config.secretAccessKey,
      },
      region: config.region,
    });
  }

  public static getInstance(): DynamoDB {
    if (!DynamoClient.instance) {
      new DynamoClient();
    }

    return DynamoClient.instance;
  }
}
