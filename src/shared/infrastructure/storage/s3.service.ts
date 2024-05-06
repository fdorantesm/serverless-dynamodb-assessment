import { S3, S3ClientConfig } from '@aws-sdk/client-s3';
import { S3Service as IS3Service } from '@/shared/domain/contracts/s3.service';

export class S3Service implements IS3Service {
  private client: S3;

  constructor(private readonly config: S3ClientConfig) {
    this.client = new S3(config);
  }

  public async getObject(bucket: string, key: string): Promise<string> {
    const object = await this.client.getObject({ Bucket: bucket, Key: key });

    if (!object?.Body) {
      throw new Error('Object not found');
    }

    return object.Body.transformToString();
  }
}
