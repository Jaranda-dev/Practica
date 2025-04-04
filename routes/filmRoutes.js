import express from 'express';
import filmController from '../controllers/filmController.js';
import { body } from 'express-validator';
import { roleMiddleware } from '../Middleware.roles.js';
import { authenticateToken } from '../authenticateToken.js';

const router = express.Router();

// Ruta GET para obtener todas las películas
router.get(
  '/', 
  authenticateToken, 
  roleMiddleware(['Invitado', 'Cliente', 'Administrador']), // Todos los roles pueden acceder a la lectura
  filmController.get
);

// Ruta POST para crear una película (solo para Cliente o Administrador)
router.post(
  '/', 
  authenticateToken, 
  roleMiddleware(['Cliente', 'Administrador']), // Solo Cliente y Administrador pueden crear películas
  [
    body('title').notEmpty().withMessage('Title is required'),
    body('description').optional().isString().withMessage('Description must be a string'),
    body('release_year').optional().isInt().withMessage('Release year must be an integer'),
    body('language_id').notEmpty().withMessage('Language id is required'),
    body('original_language_id').optional().isInt().withMessage('Original language id must be an integer'),
    body('rental_duration').notEmpty().withMessage('Rental duration is required'),
    body('rental_rate').notEmpty().withMessage('Rental rate is required'),
    body('length').optional().isInt().withMessage('Length must be an integer'),
    body('replacement_cost').notEmpty().withMessage('Replacement cost is required'),
    body('rating').optional().isString().withMessage('Rating must be a string'),
    body('special_features').optional().isString().withMessage('Special features must be a string')
  ],
  filmController.create
);

// Rutas protegidas para una película específica (ver, actualizar y eliminar)
router.route('/:id')
  .get(
    authenticateToken, 
    roleMiddleware(['Invitado', 'Cliente', 'Administrador']), // Todos los roles pueden acceder a la lectura
    filmController.show
  )
  .put(
    authenticateToken, 
    roleMiddleware(['Cliente', 'Administrador']), // Solo Cliente y Administrador pueden actualizar
    [
      body('title').notEmpty().withMessage('Title is required'),
      body('description').optional().isString().withMessage('Description must be a string'),
      body('release_year').optional().isInt().withMessage('Release year must be an integer'),
      body('language_id').notEmpty().withMessage('Language id is required'),
      body('original_language_id').optional().isInt().withMessage('Original language id must be an integer'),
      body('rental_duration').notEmpty().withMessage('Rental duration is required'),
      body('rental_rate').notEmpty().withMessage('Rental rate is required'),
      body('length').optional().isInt().withMessage('Length must be an integer'),
      body('replacement_cost').notEmpty().withMessage('Replacement cost is required'),
      body('rating').optional().isString().withMessage('Rating must be a string'),
      body('special_features').optional().isString().withMessage('Special features must be a string')
    ],
    filmController.update
  )
  .delete(
    authenticateToken, 
    roleMiddleware(['Cliente', 'Administrador']), // Solo Cliente y Administrador pueden eliminar
    filmController.delete
  );

export default router;
