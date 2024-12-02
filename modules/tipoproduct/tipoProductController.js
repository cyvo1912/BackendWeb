import { Categoria } from '../../models/Categoria.js';
import { Producto } from '../../models/Producto.js';

export const getAllTypes = async (req, res, next) => {
  try {
    const types = await Categoria.findAll();
    res.status(200).json(types);
  } catch (error) {
    next(error);
  }
};

export const getProductsByCategory = async (req, res, next) => {
  try {
    const categoriaId = parseInt(req.params.categoriaId, 10);

    // Verifica si la categoría existe
    const categoria = await Categoria.findByPk(categoriaId);
    if (!categoria) {
      return res.status(404).json({ message: 'Categoría no encontrada' });
    }

    // Busca los productos que pertenecen a esa categoría
    const productos = await Producto.findAll({
      where: { categoria_id: categoriaId },
    });

    res.status(200).json({
      categoria: categoria.nombre_categoria, // Ajusta según el nombre de tu columna
      productos,
    });
  } catch (error) {
    console.error('Error en getProductsByCategory:', error);
    next(error); // Envía el error al middleware de manejo de errores
  }
};