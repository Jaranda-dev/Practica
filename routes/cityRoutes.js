import express from 'express';
import cityController from '../controllers/cityController.js';
import { roleMiddleware } from '../Middleware.roles.js';
import { authenticateToken } from '../authenticateToken.js';

const router = express.Router();

// Ruta para obtener todas las ciudades (acceso solo de lectura para Invitado)
router.get(
  '/',  
  authenticateToken, 
  roleMiddleware(['Invitado', 'Cliente', 'Administrador']), // Acceso de lectura para Invitado, Cliente y Administrador
  cityController.get
);

export default router;
