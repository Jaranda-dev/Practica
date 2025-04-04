import express from 'express';
import addressController from '../controllers/addressController.js';
import { roleMiddleware } from '../Middleware.roles.js';
import { authenticateToken } from '../authenticateToken.js';

const router = express.Router();

// Ruta para obtener todas las direcciones (acceso solo de lectura para Invitado)
router.get(
  '/',  
  authenticateToken, 
  roleMiddleware(['Invitado', 'Cliente', 'Administrador']), // Acceso de lectura para Invitado, Cliente y Administrador
  addressController.get
);

export default router;
