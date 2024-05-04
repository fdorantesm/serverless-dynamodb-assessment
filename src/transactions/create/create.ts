
import * as AWS from 'aws-sdk';

const dynamoDb = new AWS.DynamoDB.DocumentClient();

export const handler = async (event: any = {}): Promise<any> => {
  const { id, content } = event;

  const params = {
    TableName: 'transfers',
    Item: {
      id: id,
      content: content,
      createdAt: new Date().toISOString(),
    },
  };

  try {
    await dynamoDb.put(params).promise();
    return { statusCode: 200, body: JSON.stringify(params.Item) };
  } catch (dbError) {
    return { statusCode: 500, body: JSON.stringify(dbError) };
  }
};