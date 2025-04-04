import express from 'express';
import { authenticateToken } from '../authenticateToken.js';
import { roleMiddleware } from '../Middleware.roles.js';
import roleController from '../controllers/RoleController.js';

const router = express.Router();

// Ruta para obtener todos los roles (acceso de lectura para todos los roles)
router.get(
  '/',  
  authenticateToken,  // Aseguramos que el usuario esté autenticado
  roleMiddleware(['Invitado', 'Cliente', 'Administrador']), // Todos los roles pueden ver la lista
  roleController.get  // Controlador para manejar la obtención de los roles
);

export default router;
