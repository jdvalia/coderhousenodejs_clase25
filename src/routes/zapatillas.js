import { Router } from 'express'
import * as zapatillasController from '../controller/ZapatillasController.js'

const ZapatillasRoutes = new Router();

ZapatillasRoutes.get('/', zapatillasController.obtenerZapatillas)
ZapatillasRoutes.get('/:codigoZapatilla', zapatillasController.obtenerUnZapatilla)
ZapatillasRoutes.put('/:codigoZapatilla', zapatillasController.actualizarZapatilla)
ZapatillasRoutes.delete('/:codigoZapatilla', zapatillasController.borrarZapatilla)

export default ZapatillasRoutes 