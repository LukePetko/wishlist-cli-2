import mime from 'mime-types';
import { ENV } from './env';
import { minioClient } from './fileManagement';

const insertIntoStorage = async (
  bucketPath: string | null,
  filePath: string | null,
) => {
  if (!filePath || !bucketPath) return null;

  const fileName = filePath.split('/').pop();

  const metadata = {
    'Content-Type': mime.lookup(fileName ?? '') || 'application/octet-stream',
  };

  try {
    const file = await minioClient.fPutObject(
      ENV.S3_BUCKET_NAME,
      `${bucketPath}/${fileName}`,
      filePath,
      metadata,
    );

    if (!file) return null;

    return `/${bucketPath}/${fileName}`;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default insertIntoStorage;
