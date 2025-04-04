import express from 'express';
import languageController from '../controllers/languageController.js';
const router = express.Router();
import { roleMiddleware } from '../Middleware.roles.js';
import { authenticateToken } from '../authenticateToken.js';

// Ruta GET para obtener todos los lenguajes
router.get(
  '/', 
  authenticateToken, 
  roleMiddleware(['Invitado', 'Cliente', 'Administrador']), // Todos los roles pueden acceder a la lectura
  languageController.get
);

export default router;
