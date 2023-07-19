import { DynamoDBClient, PutItemCommand, QueryCommand } from "@aws-sdk/client-dynamodb";
import { logger } from '../utils/logger';

class DynamoService {
  private dynamoClient = new DynamoDBClient({});

  public async fetchByPrefix(tableName: string, attributeName: string, prefix: string, hashName: string, hashValue: string, limit: number = 100) {
    logger.debug(`Fetching data from: ${tableName}.${attributeName} by prefix: ${prefix} and limit: ${limit}`);

    const params = {
      TableName: tableName,
      Select: "ALL_ATTRIBUTES",
      KeyConditionExpression: `${hashName} = :hash AND begins_with(${attributeName}, :prefix)`,
      ExpressionAttributeValues: {
        ':hash': { S: hashValue },
        ':prefix': { S: prefix }
      },
      Limit: limit
    };

    try {
      const data = await this.dynamoClient.send(new QueryCommand(params));
      logger.debug(`Fetching done. Items #: ${data.Count || 0}`);
      return data.Items || [];
    } catch (error) {
      logger.error('Error fetching by prefix:', error);
      throw error;
    }
  }

  public async putItem(tableName: string, item: any) {
    logger.debug(`Adding new item to: ${tableName}. Item: ${JSON.stringify(item)}`);
    const params = {
      TableName: tableName,
      Item: item
    };

    try {
      await this.dynamoClient.send(new PutItemCommand(params));
      logger.debug(`New item has been added successfully`);
    } catch (error) {
      logger.error('Error adding new item:', error);
      throw error;
    }
  }
}

export const dynamoService = new DynamoService();
