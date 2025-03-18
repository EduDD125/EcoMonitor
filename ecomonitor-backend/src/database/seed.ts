import { Sequelize } from "sequelize";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

// Carregar variáveis de ambiente
dotenv.config();

// Configurar conexão com o banco de dados
const sequelize = new Sequelize(
    process.env.DB_NAME as string,
    process.env.DB_USER as string,
    process.env.DB_PASSWORD as string,
    {
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        dialect: "postgres",
        logging: console.log, // Para ver os logs das queries
    }
);

// Função para executar o arquivo SQL
const runSeed = async () => {
    try {
        // Lendo o arquivo SQL
        const filePath = path.join(__dirname, "insert_readings.sql");
        const sql = fs.readFileSync(filePath, "utf8");

        console.log("🚀 Rodando seed do banco de dados...");

        // Executando SQL no banco
        await sequelize.query(sql);

        console.log("✅ Seed executado com sucesso!");
    } catch (error) {
        console.error("❌ Erro ao executar seed:", error);
    } finally {
        // Fechar conexão com o banco
        await sequelize.close();
    }
};

// Executar o seed
runSeed();
