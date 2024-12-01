import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

export const Categoria = sequelize.define(
    "Categoria", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre_categoria: {
            type: DataTypes.STRING
        },
        tipo_cliente_id: {
            type: DataTypes.INTEGER
        }
    }, {
        freezeTableName: true
    }
);