import { Usuario } from '../../models/Usuario.js';
import { Producto } from '../../models/Producto.js';

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await Usuario.findAll();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (req, res, next) => {
  try {
    const user = await Usuario.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const user = await Usuario.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

    await user.update(req.body);
    res.status(200).json({ message: 'Usuario actualizado exitosamente', user });
  } catch (error) {
    next(error);
  }
};

// Crear un producto
export const crearProducto = async (req, res, next) => {
  try {
    const nuevoProducto = await Producto.create(req.body);
    res.status(201).json({ message: 'Producto creado exitosamente', producto: nuevoProducto });
  } catch (error) {
    next(error);
  }
};

// Editar un producto
export const editarProducto = async (req, res, next) => {
  try {
    const { id } = req.params;
    const producto = await Producto.findByPk(id);

    if (!producto) return res.status(404).json({ message: 'Producto no encontrado' });

    await producto.update(req.body);
    res.status(200).json({ message: 'Producto actualizado exitosamente', producto });
  } catch (error) {
    next(error);
  }
};

// Eliminar un producto
export const eliminarProducto = async (req, res, next) => {
  try {
    const { id } = req.params;
    const producto = await Producto.findByPk(id);

    if (!producto) return res.status(404).json({ message: 'Producto no encontrado' });

    await producto.destroy();
    res.status(200).json({ message: 'Producto eliminado exitosamente' });
  } catch (error) {
    next(error);
  }
};
