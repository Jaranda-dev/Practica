import express from 'express';
import filmTextController from '../controllers/filmTextController.js';
import { body } from 'express-validator';
import { roleMiddleware } from '../Middleware.roles.js';
import { authenticateToken } from '../authenticateToken.js';

const router = express.Router();

// Ruta GET para obtener todos los film-text
router.get(
  '/', 
  authenticateToken, 
  roleMiddleware(['Invitado', 'Cliente', 'Administrador']), // Todos los roles pueden acceder a la lectura
  filmTextController.get
);

// Ruta POST para crear un film-text (solo para Cliente o Administrador)
router.post(
  '/', 
  authenticateToken, 
  roleMiddleware(['Cliente', 'Administrador']), // Solo Cliente y Administrador pueden crear film-text
  [
    body('film_id').isInt().withMessage('Film ID must be an integer'),
    body('title').isString().trim().notEmpty().withMessage('Title is required and must be a non-empty string'),
    body('description').optional().isString().trim().withMessage('Description must be a string')
  ],
  filmTextController.create
);

// Rutas protegidas para un film-text específico (ver, actualizar y eliminar)
router.route('/:id')
  .get(
    authenticateToken, 
    roleMiddleware(['Invitado', 'Cliente', 'Administrador']), // Todos los roles pueden acceder a la lectura
    filmTextController.show
  )
  .put(
    authenticateToken, 
    roleMiddleware(['Cliente', 'Administrador']), // Solo Cliente y Administrador pueden actualizar
    [
      body('title').optional().isString().trim().notEmpty().withMessage('Title must be a non-empty string'),
      body('description').optional().isString().trim().withMessage('Description must be a string')
    ],
    filmTextController.update
  )
  .delete(
    authenticateToken, 
    roleMiddleware(['Cliente', 'Administrador']), // Solo Cliente y Administrador pueden eliminar
    filmTextController.delete
  );

export default router;
