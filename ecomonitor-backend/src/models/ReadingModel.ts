import { UUID } from "crypto";
import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";

export class ReadingModel extends Model {
    public id!: UUID;
    public location!: string;
    public dateTime!: string;
    public measurementType!: string;
    public value!: number;
}

ReadingModel.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
        },
        location: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        dateTime: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            field: "dateTime"
        },
        measurementType: {
            type: DataTypes.STRING,
            allowNull: false,
            field: "measurementType"
        },
        value: {
            type: DataTypes.FLOAT,
            allowNull: false,
        }
    }, 
    {
        sequelize,
        tableName: "reading",
        timestamps: false,
    }

);