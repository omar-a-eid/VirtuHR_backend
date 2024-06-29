import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(
  process.env.DB_NAME || 'mydatabase',
  process.env.DB_USER || 'myuser',
  process.env.DB_PASSWORD || 'mypassword',
  {
    host: process.env.HOST || 'localhost',
    dialect: 'postgres',
    timezone: 'UTC',
  },
);

export default sequelize;
