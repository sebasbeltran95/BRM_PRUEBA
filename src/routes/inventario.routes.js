import { Router } from "express";
const router = Router()
import * as inventariocontroller from '../controller/inventario.controller.js'

router.post('/inv', inventariocontroller.crear_producto)
router.get('/inv', inventariocontroller.total_productos)
router.get('/inv/:id', inventariocontroller.buscar_producto)
router.patch('/inv/:id', inventariocontroller.actualzar_producto)
router.delete('/inv/:id', inventariocontroller.eliminar)

export default router