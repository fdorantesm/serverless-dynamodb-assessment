import * as dynamoose from 'dynamoose';
import { getDynamoDbConfig } from '@/core/infrastructure/config/dynamodb.config';

export function getConnection() {
  const { dynamodb } = getDynamoDbConfig();
  const ddb = new dynamoose.aws.ddb.DynamoDB({
    credentials: {
      accessKeyId: dynamodb.accessKeyId,
      secretAccessKey: dynamodb.secretAccessKey,
    },
    region: dynamodb.region,
  });

  dynamoose.aws.ddb.set(ddb);

  return dynamoose;
}
