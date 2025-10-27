import { z } from 'zod';

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

export const ENV = envSchema.parse(process.env);
