import dotenv from "dotenv";

dotenv.config();

export default {
  MONGO_URL: process.env.MONGO_URL,
  NODE_ENV: process.env.NODE_ENV,
  JWT_SECRET: process.env.JWT_SECRET,
  SALT_ROUNDS: 10,
};