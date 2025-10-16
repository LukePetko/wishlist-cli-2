import dotenv from 'dotenv';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { ENV } from '../lib/env';
import * as schema from './schema';

dotenv.config({ quiet: true });

const pool = new Pool({
  connectionString: ENV.DB_URL,
});

export const db = drizzle(pool, { schema });
