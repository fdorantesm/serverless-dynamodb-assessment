export function getS3Config() {
  return {
    s3: {
      accessKeyId: process.env.BACKUP_S3_ACCESS_KEY_ID || '',
      secretAccessKey: process.env.BACKUP_S3_SECRET_ACCESS_KEY || '',
      region: process.env.BACKUP_S3_REGION || '',
      bucket: process.env.BACKUP_S3_BUCKET || '',
    },
  };
}
