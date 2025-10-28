import { z } from 'zod';

declare const DB_URL: string;
declare const S3_ENDPOINT: string;
declare const S3_PORT: string;
declare const S3_ACCESS_KEY: string;
declare const S3_SECRET_KEY: string;
declare const S3_USE_SSL: string;
declare const S3_BUCKET_NAME: string;

export const envSchema = z.object({
  DB_URL: z.string(),
  S3_ENDPOINT: z.string(),
  S3_PORT: z.coerce.number().int().positive(),
  S3_ACCESS_KEY: z.string(),
  S3_SECRET_KEY: z.string(),
  S3_USE_SSL: z.coerce.boolean().default(false),
  S3_BUCKET_NAME: z.string(),
});

export type Env = z.infer<typeof envSchema>;

export const ENV = envSchema.parse({
  DB_URL,
  S3_ENDPOINT,
  S3_PORT,
  S3_ACCESS_KEY,
  S3_SECRET_KEY,
  S3_USE_SSL,
  S3_BUCKET_NAME,
});
