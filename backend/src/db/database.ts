import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const connectionString = process.env.DATABASE_URI as string;

const pool = new Pool({
  connectionString: connectionString,
});

export default pool;