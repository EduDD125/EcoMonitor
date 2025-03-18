import dotenv from 'dotenv';
import { Sequelize } from "sequelize";

dotenv.config();

export const sequelize = new Sequelize(
    process.env.DB_NAME || "ecomonitor",
    process.env.DB_USER || "postgres",
    process.env.DB_PASSWORD || "root",
    {
        host: process.env.DB_HOST || "localhost",
        port: Number(process.env.DB_PORT),
        dialect: "postgres",
        logging: console.log
    }
);