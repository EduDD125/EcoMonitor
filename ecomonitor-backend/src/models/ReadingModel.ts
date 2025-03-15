import { UUID } from "crypto";
import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";

export class ReadingModel extends Model {
    public id!: UUID;
    public location!: string;
    public dateTime!: string;
    public measurementType!: string;
    public value!: string;
}

ReadingModel.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        location: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        dateTime: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        measurementType: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        value: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, 
    {
        sequelize,
        tableName: "reading",
    }

);