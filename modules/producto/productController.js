import { Producto } from '../../models/Producto.js';

const getAllProducts = async (req, res, next) => {
  try {
    const products = await Producto.findAll();
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

const getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Producto.findByPk(id);
    if (!product) return res.status(404).json({ message: 'Producto no encontrado' });
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

export { getAllProducts, getProductById };
