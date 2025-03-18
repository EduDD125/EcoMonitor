import { sequelize } from "../config/database";
import { LogModel } from "../models/LogsModel";
import { ReadingModel } from "../models/ReadingModel";

const checkAndSyncDatabase  = async () => {
    try {
        await sequelize.authenticate();
        console.log("Database connected!");

        const [results] = await sequelize.query(`
            SELECT tablename FROM pg_tables WHERE schemaname = 'public';
            `);

        const existingTables = results.map((row: any) => row.tablename);

        const models = [LogModel, ReadingModel]; // Novos modelos devem ser adicionados aqui
                                                 // todo: pensar forma de abstrair onde ficará os modelos existentes do projeto
        const missingModels = models.filter( model => !existingTables.includes(model.getTableName()));

        if (missingModels.length > 0) {
            console.log("Some tables are missing, syncing them...");
            await Promise.all(missingModels.map(model => model.sync({ alter: true })));
            console.log("Missing tables have been created.");
        } else {
            console.log("All tables exists. No sync needed.");
        }
    } catch (error) {
        console.error("Error synchronizing database:", error);
    } finally {
        await sequelize.close();
    }
};

checkAndSyncDatabase ();