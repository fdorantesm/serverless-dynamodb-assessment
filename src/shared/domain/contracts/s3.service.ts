export interface S3Service {
  getObject(bucket: string, key: string): Promise<string>;
}
