import express from 'express';
import { getAllUsers, getUserById, updateUser, crearProducto,
        editarProducto, eliminarProducto 
} from './userController.js';
import { isAdmin } from '../auth/adminMiddleware.js';

const routerUser = express.Router();

routerUser.get('/', isAdmin, getAllUsers);          
routerUser.get('/:id', isAdmin, getUserById);      
routerUser.put('/:id', isAdmin, updateUser);       

routerUser.post('/', isAdmin, crearProducto);      
routerUser.put('/:id', isAdmin, editarProducto);   
routerUser.delete('/:id', isAdmin, eliminarProducto); 

export default routerUser;