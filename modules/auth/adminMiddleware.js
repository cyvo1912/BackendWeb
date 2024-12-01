import jwt from 'jsonwebtoken'; 
import { Usuario } from '../../models/Usuario.js'; 

const isAdmin = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]; 

    if (!token) {
      return res.status(401).json({ message: 'Token no proporcionado' }); 
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await Usuario.findByPk(decoded.id);

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' }); 
    }

    if (user.admi !== true) {
      return res.status(403).json({ message: 'No tienes permisos para acceder a esta sección' });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(500).json({ message: 'Error de autenticación', error }); 
  }
};

export { isAdmin };

