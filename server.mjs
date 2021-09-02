import express from 'express';
import path from 'path';
import { Productos } from './productos.mjs'

const PORT = 8080;
const app = express();
const multer = require('multer');
const router = express.Router();
const __dirname = path.resolve();
const productoss = new Productos();

app.use(express.static(`${__dirname}/public`));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', router);

const server = app.listen(PORT, () => {
    console.log(`server on ${PORT}`);
});

server.on('error', error => {
    console.log(error)
})

// Rutas
const pathListar = '/productos/listar';
const pathListarPorId = '/productos/listar/:id';
const pathGuardar = '/productos/guardar';
const pathUpdate = '/productos/actualizar/:id';
const pathDelete = '/productos/borrar/:id';


//////////////////////////////////////////////////////////////////////////

router.get(pathListar, (req, res) => {
    const result = productoss.getArray();
    if (result.length > 0) {
        res.status(200).send(JSON.stringify(result));
    } else {
        res.status(404).send({ error: "No hay productos cargados" });
    }
})

router.get(pathListarPorId, (req, res) => {
    const { id } = req.params
    const result = productoss.getElementById(id);
    if (result) {
        res.status(200).json((result[0]));
    } else {
        res.status(404).json({ error: "Producto no encontrado" });
    }
})

router.post(pathGuardar, (req, res) => {
    const producto = req.body
    if (producto) {
        if (producto.title && producto.precio && producto.thumbnail) {
            productoss.addElement(producto)
            res.status(200).send(producto)
        } else {
            res.status(404).send("Informacion incompleta.")
        }
    } else {
        res.status(404).send("Error al guardar producto.")

    }
})

router.put(pathUpdate, (req, res) => {
    const { id } = req.params;
    const { title, price, thumbnail } = req.body
    const newProucto = {
        title: title,
        price: price,
        thumbnail: thumbnail,
        id: parseInt(id)
    }

    if (newProucto) {
        productoss.actualizarProducto(newProucto, id);
        res.status(200).json(productoss.getElementById(id));
    } else {
        res.status(404).send({ error: 'Producto no encontrado' })
    }
})

router.delete(pathDelete, (req, res) => {
    const { id } = req.params;
    let longitud = productoss.getArray().length
    if ((id <= longitud) && (id >= 1)) {
        productoss.borrarProductoById(parseInt(id));
        res.status(200).json(productoss.getElementById(id))
    } else {
        res.status(400).send("Indice fuera de rango.")
    }

})





