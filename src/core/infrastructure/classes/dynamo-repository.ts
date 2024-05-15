import type { Entity } from '@/core/domain/classes/entity';
import type { Repository } from '@/core/infrastructure/interfaces/repository.interface';
import type { DynamoDB } from 'aws-sdk';

export class DynamoRepository<I extends { id: string }, E extends Entity<I>>
  implements Repository<E, I>
{
  constructor(
    protected readonly db: DynamoDB,
    protected readonly tableName: string,
    protected readonly entityClass: new (data: I) => E,
  ) {
    console.log('tableName', tableName);
  }

  public async create(item: I): Promise<E | null> {
    const dynamoItem = this.mapToDynamoItem(item);
    const doc = await this.db
      .putItem({
        Item: dynamoItem,
        TableName: this.tableName,
        ConditionExpression: 'attribute_not_exists(id)', // Asegura que el ítem con este id no exista
      })
      .promise()
      .then(() => this.get(item.id))
      .catch((error) => {
        throw new Error('item_already_exists');
      });

    if (!doc) {
      return null;
    }

    return doc;
  }

  public async list(filter?: any): Promise<E[]> {
    let q;
    if (filter && Object.keys(filter).length > 0) {
      const filterExpression = Object.keys(filter)
        .map((key, index) => `${key} = :value${index}`)
        .join(' and ');

      const expressionAttributeValues: { [key: string]: any } = Object.keys(
        filter,
      ).reduce((result: any, key, index) => {
        result[`:value${index}`] = { S: filter[key] };
        return result;
      }, {});

      q = await this.db
        .scan({
          TableName: this.tableName,
          FilterExpression: filterExpression,
          ExpressionAttributeValues: expressionAttributeValues,
        })
        .promise();
    } else {
      // Ejecutar un scan sin filtro
      q = await this.db
        .scan({
          TableName: this.tableName,
        })
        .promise();
    }

    if (!q.Items) {
      return [];
    }

    return q.Items.map((item) =>
      this.mapToEntity(this.mapFromDynamoItem(item)),
    );
  }

  public async get(id: string): Promise<E | null> {
    const q = await this.db
      .getItem({
        TableName: this.tableName,
        Key: { id: { S: id } },
      })
      .promise();

    if (!q.Item) {
      return null;
    }
    return this.mapToEntity(this.mapFromDynamoItem(q.Item));
  }

  public async update(id: string, item: any) {
    const itemValues = this.mapToAttributeUpdates(item);
    const doc = await this.db
      .updateItem({
        Key: { id: { S: id } },
        TableName: this.tableName,
        AttributeUpdates: itemValues,
      })
      .promise()
      .then(() => {
        return this.get(id);
      });

    if (!doc) {
      return null;
    }

    return doc;
  }

  public async delete(id: string): Promise<void> {
    this.db
      .deleteItem({
        Key: { id: { S: id } },
        TableName: this.tableName,
      })
      .promise();
  }

  public async bulkCreate(items: any[]): Promise<void> {
    const q = await this.db
      .batchWriteItem({
        RequestItems: {
          [this.tableName]: items.map((item) => ({
            PutRequest: {
              Item: item,
            },
          })),
        },
      })
      .promise();

    console.log(q);
  }

  public async clear(): Promise<void> {
    await this.db.deleteItem({ Key: {}, TableName: this.tableName }).promise();
  }

  private mapToEntity(data: I): E {
    return new this.entityClass(data);
  }

  private mapToDynamoItem(item: any): DynamoDB.PutItemInputAttributeMap {
    const dynamoItem: DynamoDB.PutItemInputAttributeMap = {};
    for (const key in item) {
      if (item.hasOwnProperty(key)) {
        const value = item[key];
        if (typeof value === 'string') {
          dynamoItem[key] = { S: value };
        } else if (typeof value === 'number') {
          dynamoItem[key] = { N: value.toString() };
        } else if (typeof value === 'boolean') {
          dynamoItem[key] = { BOOL: value };
        } else if (value instanceof Array) {
          dynamoItem[key] = { L: value.map((v) => this.mapToDynamoItem(v)) };
        } else if (typeof value === 'object') {
          dynamoItem[key] = { M: this.mapToDynamoItem(value) };
        }
      }
    }
    return dynamoItem;
  }

  private mapFromDynamoItem(dynamoItem: DynamoDB.MapAttributeValue): any {
    const item: any = {};
    for (const key in dynamoItem) {
      if (dynamoItem.hasOwnProperty(key)) {
        const value = dynamoItem[key];
        if (value.S !== undefined) {
          item[key] = value.S;
        } else if (value.N !== undefined) {
          item[key] = Number(value.N);
        } else if (value.BOOL !== undefined) {
          item[key] = value.BOOL;
        } else if (value.L !== undefined) {
          item[key] = value.L.map((v: DynamoDB.AttributeValue) =>
            this.mapFromDynamoItem(v.M!),
          );
        } else if (value.M !== undefined) {
          item[key] = this.mapFromDynamoItem(value.M);
        }
      }
    }
    return item;
  }

  private mapToAttributeUpdates(item: any): DynamoDB.AttributeUpdates {
    const attributeUpdates: DynamoDB.AttributeUpdates = {};
    for (const key in item) {
      if (item.hasOwnProperty(key)) {
        const value = item[key];
        if (typeof value === 'string') {
          attributeUpdates[key] = { Action: 'PUT', Value: { S: value } };
        } else if (typeof value === 'number') {
          attributeUpdates[key] = {
            Action: 'PUT',
            Value: { N: value.toString() },
          };
        } else if (typeof value === 'boolean') {
          attributeUpdates[key] = { Action: 'PUT', Value: { BOOL: value } };
        } else if (value instanceof Array) {
          attributeUpdates[key] = {
            Action: 'PUT',
            Value: { L: value.map((v) => this.mapToDynamoItem(v)) },
          };
        } else if (typeof value === 'object') {
          attributeUpdates[key] = {
            Action: 'PUT',
            Value: { M: this.mapToDynamoItem(value) },
          };
        }
      }
    }
    return attributeUpdates;
  }
}
