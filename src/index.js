import express from "express";
const app = express();
const port = process.env.PORT || 3030;
import { conexion } from './db.js'
import router from "./routes/inventario.routes.js";
import router_compras from "./routes/compras.routes.js";
import router_logueo from "./routes/logueo.routes.js";
import morgan from "morgan";

conexion.query('select 1')
    .then(() => console.log('exitosa'))
    .catch('error', (error) => {
        console.log(error);
    });

app.use(morgan('dev'))
app.use(express.json())
app.use('/', router)
app.use('/', router_compras)
app.use('/', router_logueo)

app.listen(port, () => {
    console.log("servidor ejecutandose en el puerto:", port);
});