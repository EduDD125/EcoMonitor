import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(
    process.env.DB_NAME || "ecomonitor",
    process.env.DB_USER || "postgres",
    process.env.DB_PASSWORD || "root",
    {
        host: process.env.DB_HOST || "localhost",
        dialect: "postgres",
        logging: false
    }
);