import express from 'express';
import { getAllProducts, getProductById } from './productController.js';

const routerProducto = express.Router();

routerProducto.get('/', getAllProducts);     
routerProducto.get('/:id', getProductById);  

export default routerProducto;
