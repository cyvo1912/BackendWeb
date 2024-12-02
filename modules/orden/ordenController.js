import { Orden } from '../../models/Orden.js';
import { Orden_Productos } from '../../models/Orden_Productos.js';
import { Producto } from '../../models/Producto.js';


const createOrder = async (req, res, next) => {
  try {
    const { id_usuario, productos, direccion, fecha, metodo_pago, nroTarjeta } = req.body;

    const newOrder = await Orden.create({ id_usuario, productos, direccion, fecha, metodo_pago, nroTarjeta });

    if (productos && productos.length > 0) {

      const productosOrden = productos.map(producto => ({
        orden_id: newOrder.id,
        producto_id: producto.id,
      }));
      await Orden_Productos.bulkCreate(productosOrden);

      // Reducir el stock de cada producto
      for (const producto of productos) {
        const productoDB = await Producto.findByPk(producto.id);

        if (!productoDB) {
          throw new Error(`Producto con ID ${producto.id} no encontrado`);
        }

        if (productoDB.stock < producto.cantidad) {
          throw new Error(
            `Stock insuficiente para el producto "${productoDB.nombre_producto}". Stock disponible: ${productoDB.stock}, solicitado: ${producto.cantidad}`
          );
        }

        await productoDB.update({ stock: productoDB.stock - producto.cantidad });
      }
    }

    res.status(201).json({ message: 'Orden creada y stock actualizado', order: newOrder });
  } catch (error) {
    console.error('Error al crear orden:', error);
    next(error);
  }
};


const getOrdersByUser = async (req, res, next) => {
  try {
    const { usuario_id } = req.params;
    const orders = await Orden.findAll({ where: { usuario_id }, include: ['productos'] });
    res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
};

export { createOrder, getOrdersByUser };
