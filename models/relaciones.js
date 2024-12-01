import { Categoria } from "./Categoria.js";
import { Tipo_Cliente } from "./Tipo_Cliente.js";
import { Producto } from "./Producto.js";
import { Usuario } from "./Usuario.js";
import { Orden } from "./Orden.js";
import { Orden_Productos } from "./Orden_Productos.js";

export function relaciones() {
    Tipo_Cliente.hasMany(Categoria, { foreignKey: 'tipo_cliente_id' });

    Categoria.belongsTo(Tipo_Cliente, { foreignKey: 'tipo_cliente_id' });


    Categoria.hasMany(Producto, { foreignKey: 'categoria_id' });
    Producto.belongsTo(Categoria, { foreignKey: 'categoria_id' });

    Usuario.hasMany(Orden, { foreignKey: 'id_usuario' });
    Orden.belongsTo(Usuario, { foreignKey: 'id_usuario' });

    Orden.hasMany(Orden_Productos, { foreignKey: 'orden_id' });
    Orden_Productos.belongsTo(Orden, { foreignKey: 'orden_id' });

    Producto.hasMany(Orden_Productos, { foreignKey: 'producto_id' });
    Orden_Productos.belongsTo(Producto, { foreignKey: 'producto_id' });
}
