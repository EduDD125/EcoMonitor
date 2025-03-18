import { UUID } from "crypto";
import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";

export class LogModel extends Model { // todo: voltar permissai de acesso de atributos para privado de criar metodos de acesso a dados
    public id!: UUID;
    public timestamp!: Date;
    public level!: "INFO" | "WARN" | "ERROR" | "DEBUG";
    public httpStatus!: number;
    public method!: "GET" | "POST" | "PUT" | "DELETE" | "REQUEST";
    public endpoint!: string;
    public message!: string;
    public requestIp!: string;
    public userAgent?: string;
    public origin!: string;
    public stackTrace?: string;
    public userId?: string;
}

LogModel.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
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
            field: "httpStatus"
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
            field: "requestIp"
        },
        origin: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        userAgent: {
            type: DataTypes.STRING,
            allowNull: true,
            field: "userAgent"
        },
        stackTrace: {
            type: DataTypes.TEXT,
            allowNull: true,
            field: "stackTrace"
        },
        userId: {
            type: DataTypes.STRING, // todo: verificar se esse tipo é condisente com implementações futuras
            allowNull: true,
            field: "userId"
        },
    },
    {
        sequelize,
        tableName: "log",
        timestamps: false,
    }

);