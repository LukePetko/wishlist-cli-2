import * as Minio from 'minio';
import { ENV } from './env';

export const minioClient = new Minio.Client({
  endPoint: ENV.S3_ENDPOINT,
  port: ENV.S3_PORT,
  accessKey: ENV.S3_ACCESS_KEY,
  secretKey: ENV.S3_SECRET_KEY,
  useSSL: ENV.S3_USE_SSL,
});
