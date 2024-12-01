import { Usuario } from '../../models/Usuario.js';

export const fetchAllUsers = async () => {
  return await Usuario.findAll();
};

export const fetchUserById = async (id) => {
  return await Usuario.findByPk(id);
};

export const updateUserById = async (id, data) => {
  const user = await Usuario.findByPk(id);
  if (!user) throw new Error('Usuario no encontrado');
  return await user.update(data);
};
