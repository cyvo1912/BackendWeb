import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

export const Usuario = sequelize.define(
    "Usuario", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: DataTypes.STRING
        },
        contraseña: {
            type: DataTypes.STRING
        },
        correo: {
            type: DataTypes.STRING
        },
        telefono: {
            type: DataTypes.STRING
        },
        admi: {
            type: DataTypes.BOOLEAN
        }
    }, {
        freezeTableName: true
    }
);
