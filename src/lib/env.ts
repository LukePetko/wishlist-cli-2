import { z } from 'zod';

export const envSchema = z.object({
  DB_URL: z.string(),
});

export type Env = z.infer<typeof envSchema>;

export const ENV = envSchema.parse(process.env);
