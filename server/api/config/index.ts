import dotenv from "dotenv";
dotenv.config();
export default {
  PORT: parseInt(process.env.PORT || "3001"),
  REQUEST_LIMIT: process.env.REQUEST_LIMIT,
  NODE_ENV: process.env.NODE_ENV,
  JWT: {
    PASSWORD_SECRET: process.env.PASSWORD_SECRET,
    ACCESS_SECRET: process.env.ACCESS_SECRET,
    EXPIRES_IN: process.env.EXPIRES_IN,
    ISSUER: process.env.ISSUER,
  },
  MYSQLDB: {
    DATABASE_NAME: process.env.DB_NAME,
    USERNAME: process.env.DB_USERNAME,
    PASSWORD: process.env.DB_PASSWORD,
    HOST: process.env.DB_HOST,
  },
};
