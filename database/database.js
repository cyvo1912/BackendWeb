import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize("postgres", "postgres", "cyvo1912", {
    host: "localhost",
    dialect: "postgres"
});
