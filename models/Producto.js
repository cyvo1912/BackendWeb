import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

export const Producto = sequelize.define(
    "Producto", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre_producto: {
            type: DataTypes.STRING
        },
        imagen: {
            type: DataTypes.STRING
        },
        precio: {
            type: DataTypes.DECIMAL(10, 2)
        },
        descripcion: {
            type: DataTypes.STRING
        },
        color: {
            type: DataTypes.STRING
        },
        stock: {
            type: DataTypes.INTEGER
        },
        talla: {
            type: DataTypes.STRING
        },
        categoria_id: {
            type: DataTypes.INTEGER
        }
    }, {
        freezeTableName: true
    }
);
