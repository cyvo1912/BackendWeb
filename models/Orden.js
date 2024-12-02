import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

export const Orden = sequelize.define(
    "Orden", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        fecha: {
            type: DataTypes.DATE
        },
        direccion: {
            type: DataTypes.STRING
        },
        tarjeta: {
            type: DataTypes.STRING
        },
        metodo_pago: {
            type: DataTypes.STRING
        },
        id_usuario: {
            type: DataTypes.INTEGER
        }
    }, {
        freezeTableName: true
    }
);
