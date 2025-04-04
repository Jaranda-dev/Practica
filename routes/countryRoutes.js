import express from 'express';
import countryController from '../controllers/countryController.js';
import { roleMiddleware } from '../Middleware.roles.js';
import { authenticateToken } from '../authenticateToken.js';

const router = express.Router();

// Ruta para obtener todos los países (acceso solo de lectura para Invitado)
router.get(
  '/',  
  authenticateToken, 
  roleMiddleware(['Invitado', 'Cliente', 'Administrador']), // Acceso de lectura para Invitado, Cliente y Administrador
  countryController.get
);

export default router;
