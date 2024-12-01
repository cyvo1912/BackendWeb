import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

export const Tipo_Cliente = sequelize.define(
    "Tipo_Cliente", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre_tipo_cliente: {
            type: DataTypes.STRING
        },
    }, {
        freezeTableName: true
    }
);

