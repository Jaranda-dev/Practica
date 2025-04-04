import express from 'express';
import storeController from '../controllers/storeController.js';
const router = express.Router();
import { roleMiddleware } from '../Middleware.roles.js';
import { authenticateToken } from '../authenticateToken.js';

// Ruta GET para obtener todos los registros de store (solo lectura para los roles 'Invitado', 'Cliente', 'Administrador')
router.get(
  '/', 
  authenticateToken, 
  roleMiddleware(['Invitado', 'Cliente', 'Administrador']), // Permitir solo lectura a estos roles
  storeController.get
);

export default router;
