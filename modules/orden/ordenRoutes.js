import express from 'express';
import { createOrder, getOrdersByUser } from './ordenController.js';

const routerOrden = express.Router();

routerOrden.post('/', createOrder);  
routerOrden.get('/user/:usuario_id', getOrdersByUser); 

export default routerOrden;
