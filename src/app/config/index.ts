import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join((process.cwd(), '.env')) });

export default {
  port: process.env.PORT,
  db_url: process.env.DB_URL,
  salt_rounds: process.env.SALT_ROUND,
  jwt_secret: process.env.JWT_SECRET,
  jwt_expiry: process.env.JWT_EXPIRY,
};
