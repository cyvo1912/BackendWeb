import express from 'express';
import cors from 'cors';

import { sequelize } from './database/database.js';
import { Categoria } from './models/Categoria.js';
import { Orden_Productos } from './models/Orden_Productos.js';
import { Orden } from './models/Orden.js';
import { Producto } from './models/Producto.js';
import { Tipo_Cliente } from './models/Tipo_Cliente.js';
import { Usuario } from './models/Usuario.js';
import { relaciones } from './models/relaciones.js';

import routerAuth from './modules/auth/authRoutes.js';
import routerOrden from './modules/orden/ordenRoutes.js';
import routerTipo from './modules/tipoproduct/tipoProductRoutes.js';
import routerUser from './modules/user/userRoutes.js';
import routerProducto from './modules/producto/productRoutes.js';

const app = express();
const port = 3008;

app.use(express.json());
app.use(cors());

app.use('/products', routerProducto);
app.use('/inicioSesion', routerAuth);
app.use('/orden', routerOrden);
app.use('/tipo', routerTipo);
app.use('/usuarios', routerUser);

relaciones();

async function verificarConexion(){
    try{
        await sequelize.authenticate();
        console.log("Conexion a BD exitosa")
        await sequelize.sync();
    }catch (error){
        console.error("Ocurrio un error con la conexion a la BD", error)
    }
}

async function insertTiposCliente() {
    const tiposCliente = [
      {
        id: 1,
        nombre_tipo_cliente: "Hombre"
      },
      {
        id: 2,
        nombre_tipo_cliente: "Mujer"
      },
      {
        id: 3,
        nombre_tipo_cliente: "Niño"
      },
    ];

    try {
      await Tipo_Cliente.bulkCreate(tiposCliente);
      console.log("Tipos de cliente insertados correctamente.");
    } catch (error) {
      console.error("Error al insertar los tipos de cliente:", error);
    }
  }
  
insertTiposCliente();

async function insertCategorias() {
    const categorias = [
      { id: 1, nombre_categoria: "Vestidos", tipo_cliente_id: 2 },
      { id: 2, nombre_categoria: "Blusas|Camisas", tipo_cliente_id: 2 },
      { id: 3, nombre_categoria: "Camisetas", tipo_cliente_id: 2 },
      { id: 4, nombre_categoria: "Pantalones", tipo_cliente_id: 2 },
      { id: 5, nombre_categoria: "Jeans", tipo_cliente_id: 2 },
      { id: 6, nombre_categoria: "Faldas", tipo_cliente_id: 2 },
      { id: 7, nombre_categoria: "Zapatos", tipo_cliente_id: 2 },
      { id: 8, nombre_categoria: "Bolsos", tipo_cliente_id: 2 },
      { id: 9, nombre_categoria: "Perfumes", tipo_cliente_id: 2 },
      { id: 10, nombre_categoria: "Sudaderas", tipo_cliente_id: 2 },
  
      { id: 11, nombre_categoria: "Camisetas", tipo_cliente_id: 1 },
      { id: 12, nombre_categoria: "Pantalones", tipo_cliente_id: 1 },
      { id: 13, nombre_categoria: "Jeans", tipo_cliente_id: 1 },
      { id: 14, nombre_categoria: "Zapatos", tipo_cliente_id: 1 },
      { id: 15, nombre_categoria: "Perfumes", tipo_cliente_id: 1 },
      { id: 16, nombre_categoria: "Sudaderas", tipo_cliente_id: 1 },
      { id: 17, nombre_categoria: "Trajes", tipo_cliente_id: 1 },
      { id: 18, nombre_categoria: "Camisas", tipo_cliente_id: 1 },
      { id: 19, nombre_categoria: "Mochilas", tipo_cliente_id: 1 },
  
      { id: 20, nombre_categoria: "Zapatos", tipo_cliente_id: 3 },
      { id: 21, nombre_categoria: "Perfumes", tipo_cliente_id: 3 },
      { id: 22, nombre_categoria: "Mochilas", tipo_cliente_id: 3 },
      { id: 23, nombre_categoria: "Trajes", tipo_cliente_id: 3 }
    ];
  
    try {
      await Categoria.bulkCreate(categorias);
      console.log("Categorías insertadas correctamente.");
    } catch (error) {
      console.error("Error al insertar las categorías:", error);
    }
  }
  
insertCategorias();

async function agregarProductos() {
  const productos = [
    { id: 1, nombre_producto: "Vestido Casual Largo", precio: "199.00", imagen: "https://d3fvqmu2193zmz.cloudfront.net/items_2/uid_commerces.1/uid_items_2.FDL87A9TZB1G/500x500/65B270E86F794-Vestido-Casual-Mujer-Largo-Ale.webp", tipo_cliente_id: 2, color: "Rojo", talla: "S", stock: 10, descripcion: "Vestido largo de color rojo, ideal para ocasiones casuales.", categoria_id: 1 },
    { id: 2, nombre_producto: "Vestido Casual Largo", precio: "199.00", imagen: "https://d3fvqmu2193zmz.cloudfront.net/items_2/uid_commerces.1/uid_items_2.FDL87A9TZB1G/500x500/65B270E86F794-Vestido-Casual-Mujer-Largo-Ale.webp", tipo_cliente_id: 2, color: "Rojo", talla: "M", stock: 12, descripcion: "Vestido largo de color rojo, ideal para ocasiones casuales.", categoria_id: 1 },
    { id: 3, nombre_producto: "Blusa con Encaje", precio: "149.00", imagen: "https://img.kwcdn.com/product/Fancyalgo/VirtualModelMatting/c3f106018ebbe96538a03a5840f2bde5.jpg", tipo_cliente_id: 2, color: "Blanco", talla: "S", stock: 8, descripcion: "Blusa blanca con encaje, perfecta para eventos formales.", categoria_id: 2 },
    { id: 4, nombre_producto: "Blusa con Encaje", precio: "149.00", imagen: "https://img.kwcdn.com/product/Fancyalgo/VirtualModelMatting/c3f106018ebbe96538a03a5840f2bde5.jpg", tipo_cliente_id: 2, color: "Blanco", talla: "M", stock: 10, descripcion: "Blusa blanca con encaje, perfecta para eventos formales.", categoria_id: 2 },
    { id: 5, nombre_producto: "Camiseta Estampada", precio: "99.00", imagen: "https://m.media-amazon.com/images/I/71tlYWmr5LL.jpg", tipo_cliente_id: 2, color: "Azul", talla: "S", stock: 15, descripcion: "Camiseta azul con estampado vibrante, ideal para el día a día.", categoria_id: 3 },
    { id: 6, nombre_producto: "Camiseta Estampada", precio: "99.00", imagen: "https://m.media-amazon.com/images/I/71tlYWmr5LL.jpg", tipo_cliente_id: 2, color: "Azul", talla: "M", stock: 10, descripcion: "Camiseta azul con estampado vibrante, ideal para el día a día.", categoria_id: 3 },
    { id: 7, nombre_producto: "Zapatos de Tacón", precio: "249.00", imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUYN1WvJXcJ2Tw7T1SrsO1-jlDYrJbhQrRtA&s", tipo_cliente_id: 2, color: "Negro", talla: "36", stock: 10, descripcion: "Zapatos de tacón en color negro, ideales para eventos formales.", categoria_id: 7 },
    { id: 8, nombre_producto: "Zapatos de Tacón", precio: "249.00", imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUYN1WvJXcJ2Tw7T1SrsO1-jlDYrJbhQrRtA&s", tipo_cliente_id: 2, color: "Negro", talla: "41", stock: 8, descripcion: "Zapatos de tacón en color negro, ideales para eventos formales.", categoria_id: 7 },
    { id: 9, nombre_producto: "Zapatos Deportivos", precio: "159.00", imagen: "https://oechsle.vteximg.com.br/arquivos/ids/17285613-800-800/2566850_1.jpg", tipo_cliente_id: 3, color: "Blanco", talla: "36", stock: 12, descripcion: "Zapatos deportivos para niños, cómodos y resistentes.", categoria_id: 7 },
    { id: 10, nombre_producto: "Zapatos Deportivos", precio: "159.00", imagen: "https://oechsle.vteximg.com.br/arquivos/ids/17285613-800-800/2566850_1.jpg", tipo_cliente_id: 3, color: "Blanco", talla: "41", stock: 10, descripcion: "Zapatos deportivos para niños, cómodos y resistentes.", categoria_id: 7 },
    { id: 11, nombre_producto: "Perfume Floral Dulce", precio: "499.00", imagen: "https://media.vogue.es/photos/63dcf75b52c24dd9f69174e7/3:4/w_748%2Cc_limit/image%2520(41).png", tipo_cliente_id: 2, color: "N/A", talla: "N/A", stock: 20, descripcion: "Perfume floral con notas dulces, ideal para el día a día.", categoria_id: 9 },
    { id: 12, nombre_producto: "Perfume Amaderado", precio: "599.00", imagen: "https://media.vogue.mx/photos/63e3d3897b4a6f9b0cad5e09/master/w_1600%2Cc_limit/Perfumes-Amaderados-Hombre-Terre-Hermes.jpg", tipo_cliente_id: 1, color: "N/A", talla: "N/A", stock: 15, descripcion: "Perfume amaderado con un aroma sofisticado para hombres.", categoria_id: 9 },
    { id: 13, nombre_producto: "Bolso de Mano Elegante", precio: "299.00", imagen: "https://m.media-amazon.com/images/I/71e4r65rnYL.jpg", tipo_cliente_id: 2, color: "Beige", talla: "N/A", stock: 10, descripcion: "Bolso de mano elegante con diseño minimalista.", categoria_id: 8 },
    { id: 14, nombre_producto: "Mochila Escolar", precio: "199.00", imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7fbvP3xbBRxtzmE-RA3-8Bc02djXQPin94A&s", tipo_cliente_id: 3, color: "Azul", talla: "N/A", stock: 15, descripcion: "Mochila escolar resistente y espaciosa.", categoria_id: 19 },
    { id: 15, nombre_producto: "Camiseta Básica", precio: "89.00", imagen: "https://imagedelivery.net/4fYuQyy-r8_rpBpcY7lH_A/falabellaPE/20569761_1/w=800,h=800,fit=pad", tipo_cliente_id: 1, color: "Gris", talla: "S", stock: 12, descripcion: "Camiseta básica gris, ideal para uso diario.", categoria_id: 3 },
    { id: 16, nombre_producto: "Camiseta Básica", precio: "89.00", imagen: "https://imagedelivery.net/4fYuQyy-r8_rpBpcY7lH_A/falabellaPE/20569761_1/w=800,h=800,fit=pad", tipo_cliente_id: 1, color: "Gris", talla: "M", stock: 14, descripcion: "Camiseta básica gris, ideal para uso diario.", categoria_id: 3 },
    { id: 17, nombre_producto: "Jeans Rectos", precio: "179.00", imagen: "https://f.fcdn.app/imgs/3228d1/www.otherside.com.uy/osiduy/48c6/original/catalogo/OS7MGPS2-338-1/2000-2000/jean-recto-azul-oscuro.jpg", tipo_cliente_id: 1, color: "Azul Oscuro", talla: "S", stock: 10, descripcion: "Jeans rectos de corte cómodo y moderno.", categoria_id: 5 },
    { id: 18, nombre_producto: "Jeans Rectos", precio: "179.00", imagen: "https://f.fcdn.app/imgs/3228d1/www.otherside.com.uy/osiduy/48c6/original/catalogo/OS7MGPS2-338-1/2000-2000/jean-recto-azul-oscuro.jpg", tipo_cliente_id: 1, color: "Azul Oscuro", talla: "M", stock: 15, descripcion: "Jeans rectos de corte cómodo y moderno.", categoria_id: 5 },
    { id: 19, nombre_producto: "Chaqueta de Cuero", precio: "399.00", imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjS9CKMb-P8gZQmuPO3rk_WVX7rOCsfQMzB0y0h2bYo5Bfb-BOQgQLMKgDRT2SOyTG07A&s", tipo_cliente_id: 2, color: "Negro", talla: "L", stock: 8, descripcion: "Chaqueta de cuero negro, ideal para el invierno.", categoria_id: 3 },
    { id: 20, nombre_producto: "Chaqueta de Cuero", precio: "399.00", imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjS9CKMb-P8gZQmuPO3rk_WVX7rOCsfQMzB0y0h2bYo5Bfb-BOQgQLMKgDRT2SOyTG07A&s", tipo_cliente_id: 2, color: "Negro", talla: "XL", stock: 6, descripcion: "Chaqueta de cuero negro, ideal para el invierno.", categoria_id: 3 },
    { id: 21, nombre_producto: "Falda Corto", precio: "129.00", imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4vQktYg-6jHgWxPOh7h7bW7_tJ0wvFq3tnQ&usqp=CAU", tipo_cliente_id: 2, color: "Rojo", talla: "S", stock: 12, descripcion: "Falda corta de corte elegante y moderno.", categoria_id: 6 },
    { id: 22, nombre_producto: "Falda Corto", precio: "129.00", imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4vQktYg-6jHgWxPOh7h7bW7_tJ0wvFq3tnQ&usqp=CAU", tipo_cliente_id: 2, color: "Rojo", talla: "M", stock: 15, descripcion: "Falda corta de corte elegante y moderno.", categoria_id: 6 },
    { id: 23, nombre_producto: "Gorra Deportiva", precio: "99.00", imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQ2Fx7RA52hZI-35pYYVmn_oUzJw27ctUssWkP6dpahJ0Nfq--HF7Vh2bCm9GVW7EYzA&usqp=CAU", tipo_cliente_id: 3, color: "Negro", talla: "N/A", stock: 20, descripcion: "Gorra deportiva ideal para cualquier actividad al aire libre.", categoria_id: 19 },
    { id: 24, nombre_producto: "Gorra Deportiva", precio: "99.00", imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQ2Fx7RA52hZI-35pYYVmn_oUzJw27ctUssWkP6dpahJ0Nfq--HF7Vh2bCm9GVW7EYzA&usqp=CAU", tipo_cliente_id: 3, color: "Negro", talla: "N/A", stock: 18, descripcion: "Gorra deportiva ideal para cualquier actividad al aire libre.", categoria_id: 19 },
    { id: 25, nombre_producto: "Zapatillas Running", precio: "199.00", imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXxaqakTk2QHXmQyK0U2VpJJrfZAPXO43q0HfXYqG3gl5AGjMyYWn8xwW5BOr4ybqg2VA&usqp=CAU", tipo_cliente_id: 3, color: "Blanco", talla: "37", stock: 22, descripcion: "Zapatillas deportivas para running, ligeras y cómodas.", categoria_id: 7 },
    { id: 26, nombre_producto: "Zapatillas Running", precio: "199.00", imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXxaqakTk2QHXmQyK0U2VpJJrfZAPXO43q0HfXYqG3gl5AGjMyYWn8xwW5BOr4ybqg2VA&usqp=CAU", tipo_cliente_id: 3, color: "Blanco", talla: "40", stock: 18, descripcion: "Zapatillas deportivas para running, ligeras y cómodas.", categoria_id: 7 },
    { id: 27, nombre_producto: "Traje de Baño", precio: "159.00", imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQj9beoBfzNf4rHAc4Fe_YA31BfhU8yFGHV6swfVVeiNlCkh2DLbggRQC6smhF_vw7nVg&usqp=CAU", tipo_cliente_id: 2, color: "Azul", talla: "M", stock: 25, descripcion: "Traje de baño de una sola pieza, ideal para la piscina.", categoria_id: 17 },
    { id: 28, nombre_producto: "Traje de Baño", precio: "159.00", imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQj9beoBfzNf4rHAc4Fe_YA31BfhU8yFGHV6swfVVeiNlCkh2DLbggRQC6smhF_vw7nVg&usqp=CAU", tipo_cliente_id: 2, color: "Azul", talla: "L", stock: 22, descripcion: "Traje de baño de una sola pieza, ideal para la piscina.", categoria_id: 17 },
    { id: 29, nombre_producto: "Sombrero de Sol", precio: "129.00", imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS30iZfwb3eJfzntJ7vYm7ZsV9sDlGZ5eyGAQ&usqp=CAU", tipo_cliente_id: 3, color: "Beige", talla: "N/A", stock: 15, descripcion: "Sombrero de sol para protegerse del calor y verse a la moda.", categoria_id: 19 },
    { id: 30, nombre_producto: "Sombrero de Sol", precio: "129.00", imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS30iZfwb3eJfzntJ7vYm7ZsV9sDlGZ5eyGAQ&usqp=CAU", tipo_cliente_id: 3, color: "Beige", talla: "N/A", stock: 20, descripcion: "Sombrero de sol para protegerse del calor y verse a la moda.", categoria_id: 19 },
    { id: 31, nombre_producto: "Camisa de Manga Larga", precio: "199.00", imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgtmYN5eN2zTbkaI7ybsfB8Fje3Fc9RUb7jQ&usqp=CAU", tipo_cliente_id: 1, color: "Blanco", talla: "L", stock: 13, descripcion: "Camisa de manga larga blanca, ideal para el trabajo y eventos formales.", categoria_id: 2 },
    { id: 32, nombre_producto: "Camisa de Manga Larga", precio: "199.00", imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgtmYN5eN2zTbkaI7ybsfB8Fje3Fc9RUb7jQ&usqp=CAU", tipo_cliente_id: 1, color: "Blanco", talla: "M", stock: 16, descripcion: "Camisa de manga larga blanca, ideal para el trabajo y eventos formales.", categoria_id: 2 },
    { id: 33, nombre_producto: "Botines de Cuero", precio: "249.00", imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6jcFLRek9gBoz3jlNcXysJvFwFeqkP-qhoA&usqp=CAU", tipo_cliente_id: 2, color: "Café", talla: "40", stock: 10, descripcion: "Botines de cuero ideales para el otoño y la primavera.", categoria_id: 7 },
    { id: 34, nombre_producto: "Botines de Cuero", precio: "249.00", imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6jcFLRek9gBoz3jlNcXysJvFwFeqkP-qhoA&usqp=CAU", tipo_cliente_id: 2, color: "Café", talla: "41", stock: 7, descripcion: "Botines de cuero ideales para el otoño y la primavera.", categoria_id: 7 },
    { id: 35, nombre_producto: "Blusa de Seda", precio: "249.00", imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS19fjlAXD-R-N_2f02qgd7KKQ6lyV7bhA28A&usqp=CAU", tipo_cliente_id: 2, color: "Beige", talla: "S", stock: 8, descripcion: "Blusa de seda de alta calidad, elegante y sofisticada.", categoria_id: 2 },
    { id: 36, nombre_producto: "Blusa de Seda", precio: "249.00", imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS19fjlAXD-R-N_2f02qgd7KKQ6lyV7bhA28A&usqp=CAU", tipo_cliente_id: 2, color: "Beige", talla: "M", stock: 6, descripcion: "Blusa de seda de alta calidad, elegante y sofisticada.", categoria_id: 2 },
    { id: 37, nombre_producto: "Pantalón de Lino", precio: "179.00", imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbsQlx6FAKqB8JPT-2gqS7hzJcNmLscDl-JQ&usqp=CAU", tipo_cliente_id: 1, color: "Blanco", talla: "M", stock: 18, descripcion: "Pantalón de lino, fresco y cómodo para el verano.", categoria_id: 4 },
    { id: 38, nombre_producto: "Pantalón de Lino", precio: "179.00", imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbsQlx6FAKqB8JPT-2gqS7hzJcNmLscDl-JQ&usqp=CAU", tipo_cliente_id: 1, color: "Blanco", talla: "L", stock: 20, descripcion: "Pantalón de lino, fresco y cómodo para el verano.", categoria_id: 4 },
    { id: 39, nombre_producto: "Sandalias de Playa", precio: "99.00", imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2HRtmROve63ZT62O91bsFyYoB5A2OtCwD5Q&usqp=CAU", tipo_cliente_id: 3, color: "Azul", talla: "38", stock: 25, descripcion: "Sandalias cómodas para la playa, fáciles de llevar y frescas.", categoria_id: 7 },
    { id: 40, nombre_producto: "Sandalias de Playa", precio: "99.00", imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2HRtmROve63ZT62O91bsFyYoB5A2OtCwD5Q&usqp=CAU", tipo_cliente_id: 3, color: "Azul", talla: "40", stock: 30, descripcion: "Sandalias cómodas para la playa, fáciles de llevar y frescas.", categoria_id: 7 },
    { id: 41, nombre_producto: "Bufanda de Lana", precio: "129.00", imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgZ8mChntWjmbGiHtNe3o_0ldEy_FOsIHGnQ&usqp=CAU", tipo_cliente_id: 2, color: "Rojo", talla: "N/A", stock: 15, descripcion: "Bufanda de lana suave y cálida para invierno.", categoria_id: 19 },
    { id: 42, nombre_producto: "Bufanda de Lana", precio: "129.00", imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgZ8mChntWjmbGiHtNe3o_0ldEy_FOsIHGnQ&usqp=CAU", tipo_cliente_id: 2, color: "Rojo", talla: "N/A", stock: 12, descripcion: "Bufanda de lana suave y cálida para invierno.", categoria_id: 19 },
    { id: 43, nombre_producto: "Chaqueta de Invierno", precio: "399.00", imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTk-_9GHY0hBeLqF-wl5d5Xl-Wf9Z_z-MGOelq77j6lGk4AtDg2hv36bIZqFA_RUmkckw&usqp=CAU", tipo_cliente_id: 2, color: "Azul Marino", talla: "L", stock: 9, descripcion: "Chaqueta de invierno gruesa para mantener el calor.", categoria_id: 3 },
    { id: 44, nombre_producto: "Chaqueta de Invierno", precio: "399.00", imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTk-_9GHY0hBeLqF-wl5d5Xl-Wf9Z_z-MGOelq77j6lGk4AtDg2hv36bIZqFA_RUmkckw&usqp=CAU", tipo_cliente_id: 2, color: "Azul Marino", talla: "M", stock: 8, descripcion: "Chaqueta de invierno gruesa para mantener el calor.", categoria_id: 3 },
    { id: 45, nombre_producto: "Cinturón de Cuero", precio: "99.00", imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrm2UMRhpwhHH2TrhHpNc5qlPRm72YOVpH8wR4JK8ybZG4oaNS2jAql6sDZ67g92A4dQ&usqp=CAU", tipo_cliente_id: 1, color: "Negro", talla: "M", stock: 14, descripcion: "Cinturón de cuero negro, elegante y resistente.", categoria_id: 17 },
    { id: 46, nombre_producto: "Cinturón de Cuero", precio: "99.00", imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrm2UMRhpwhHH2TrhHpNc5qlPRm72YOVpH8wR4JK8ybZG4oaNS2jAql6sDZ67g92A4dQ&usqp=CAU", tipo_cliente_id: 1, color: "Negro", talla: "L", stock: 16, descripcion: "Cinturón de cuero negro, elegante y resistente.", categoria_id: 17 },
    { id: 47, nombre_producto: "Chaqueta de Denim", precio: "219.00", imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQrP2Otjsr7h9NVA43AmXKO8gdIwmnEjR-Qnw3gBf6vY1s2Qekz7pLysHwmEd4dNT_kYQ&usqp=CAU", tipo_cliente_id: 2, color: "Azul Claro", talla: "M", stock: 10, descripcion: "Chaqueta de denim para un look casual.", categoria_id: 3 },
    { id: 48, nombre_producto: "Chaqueta de Denim", precio: "219.00", imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQrP2Otjsr7h9NVA43AmXKO8gdIwmnEjR-Qnw3gBf6vY1s2Qekz7pLysHwmEd4dNT_kYQ&usqp=CAU", tipo_cliente_id: 2, color: "Azul Claro", talla: "L", stock: 9, descripcion: "Chaqueta de denim para un look casual.", categoria_id: 3 },
    { id: 49, nombre_producto: "Camiseta de Manga Corta", precio: "89.00", imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7bf4IqfF54duMNL1YZ0ga2zKq8k3Hlfduog&usqp=CAU", tipo_cliente_id: 1, color: "Verde", talla: "S", stock: 20, descripcion: "Camiseta de manga corta, perfecta para el verano.", categoria_id: 3 },
    { id: 50, nombre_producto: "Camiseta de Manga Corta", precio: "89.00", imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7bf4IqfF54duMNL1YZ0ga2zKq8k3Hlfduog&usqp=CAU", tipo_cliente_id: 1, color: "Verde", talla: "M", stock: 25, descripcion: "Camiseta de manga corta, perfecta para el verano.", categoria_id: 3 }
  ]
    try {
        await Producto.bulkCreate(productos);
        console.log("Productos insertados correctamente.");
      } catch (error) {
        console.error("Error al insertar los productos:", error);
    }
  }
agregarProductos()

const crearUsuarios = async () => {
  try {
      await Usuario.create({
          nombre: 'Piero Gutierrez',
          contraseña: 'Guty123', // Asegúrate de encriptar las contraseñas en un entorno real
          correo: 'pierog@gmail.com',
          telefono: '987654321',
          admi: false
      });

      await Usuario.create({
          nombre: 'Gabriel Tieno',
          contraseña: 'Kabo742',
          correo: 'Kabo742@gmail.com',
          telefono: '912345678',
          admi: true
      });

      console.log("Usuarios creados exitosamente.");
  } catch (error) {
      console.error("Error al crear los usuarios:", error);
  }
};

crearUsuarios();

app.listen(port, () => {
    console.log("Servidor esta activo en puerto " + port);
    verificarConexion();
});