import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config(); // Cargar el archivo .env primero

import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});