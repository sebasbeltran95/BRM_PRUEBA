import { Router } from "express";
const router = Router()
import * as comprascontroller from '../controller/compras.controller.js'

router.post('/com', comprascontroller.crear_compra)
router.get('/com', comprascontroller.total_compra)
router.get('/com/:id', comprascontroller.buscar_compra)
router.patch('/com/:id', comprascontroller.actualzar_compra)
router.delete('/com/:id', comprascontroller.eliminar_compras)

export default router