import express from 'express';
import actorController from '../controllers/actorController.js';
import { body } from 'express-validator';
import { roleMiddleware } from '../Middleware.roles.js';
import { authenticateToken } from '../authenticateToken.js';

const router = express.Router();

// Ruta para obtener todos los actores (acceso solo de lectura para Invitado)
router.get(
  '/',  
  authenticateToken, 
  roleMiddleware(['Invitado', 'Cliente', 'Administrador']), // Acceso de lectura para Invitado, Cliente y Administrador
  actorController.get
);

// Ruta para crear un actor (solo Cliente y Administrador pueden crear actores)
router.post(
  '/',
  authenticateToken, 
  roleMiddleware(['Cliente', 'Administrador']), // Solo Cliente o Administrador puede crear actores
  [
    body('first_name').notEmpty().withMessage('First name is required'),
    body('last_name').notEmpty().withMessage('Last name is required')
  ],
  actorController.create
);

// Rutas para un actor específico (ver, actualizar y eliminar)
router.route('/:id')
  .get(
    authenticateToken, 
    roleMiddleware(['Invitado', 'Cliente', 'Administrador']), // Acceso de lectura para todos los roles
    actorController.show
  )
  .put(
    authenticateToken, 
    roleMiddleware(['Cliente', 'Administrador']), // Solo Cliente o Administrador pueden actualizar un actor
    [
      body('first_name').notEmpty().withMessage('First name is required'),
      body('last_name').notEmpty().withMessage('Last name is required')
    ],
    actorController.update
  )
  .delete(
    authenticateToken, 
    roleMiddleware(['Cliente', 'Administrador']), // Solo Cliente o Administrador pueden eliminar un actor
    actorController.delete
  );

export default router;
