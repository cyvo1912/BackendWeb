import jwt from 'jsonwebtoken';
import { Usuario } from '../../models/Usuario.js';

export const authenticateToken = (req, res, next) => {
  // Extrae el token del header Authorization
  const token = req.header('Authorization')?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({ error: 'No se proporciona token de autenticación.' });
  }

  try {
    // Verifica el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Token inválido.' });
  }
};
