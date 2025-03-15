import { UUID } from "crypto";
import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";

export class LogModel extends Model {
    private id!: UUID;
    private timestamp!: Date;
    private level!: "INFO" | "WARN" | "ERROR" | "DEBUG";
    private httpStatus!: number;
    private method!: string;
    private endpoint!: string;
    private message!: string;
    private requestIp!: string;
    private userAgent?: string;
    private origin!: string;
    private stackTrace?: string;
    private userId?: string;
}

LogModel.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        timestamp: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        level: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: { // ainda mantem level como string, facilitando migrações de banco, não precisa de migrações futuramente caso valores aceitos mudem, evita erros no banco de dados ao se tentar inserir valores invalidos
                isIn: [["INFO", "WARN", "ERROR", "DEBUG"]],
            },
        },
        httpStatus: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        method: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: { // mesma ideia da valida a cima
                isIn: [["GET", "POST", "PUT", "DELETE"]],
            },
        },
        endpoint: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        message: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        requestIp: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        origin: {
        type: DataTypes.STRING,
        allowNull: false,
        },
        userAgent: {
        type: DataTypes.STRING,
        allowNull: true,
        },
        stackTrace: {
        type: DataTypes.TEXT,
        allowNull: true,
        },
        userId: {
        type: DataTypes.STRING, // todo: verificar se esse tipo é condisente com implementações futuras
        allowNull: true,
        },
    },
    {
        sequelize,
        tableName: "reading",
    }

);