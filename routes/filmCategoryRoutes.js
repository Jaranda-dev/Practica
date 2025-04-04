import express from 'express';
import filmCategoryController from '../controllers/filmCategoryController.js';
import { body } from 'express-validator';
import { roleMiddleware } from '../Middleware.roles.js';
import { authenticateToken } from '../authenticateToken.js';

const router = express.Router();

// Ruta GET para obtener todas las film-categories
router.get(
  '/', 
  authenticateToken, 
  roleMiddleware(['Invitado', 'Cliente', 'Administrador']), // Todos los roles pueden acceder a la lectura
  filmCategoryController.get
);

// Ruta POST para crear una film-category (solo para Cliente o Administrador)
router.post(
  '/', 
  authenticateToken, 
  roleMiddleware(['Cliente', 'Administrador']), // Solo Cliente y Administrador pueden crear film-categories
  [
    body('film_id').notEmpty().withMessage('Film_id is required'),
    body('category_id').notEmpty().withMessage('Category_id is required')
  ],
  filmCategoryController.create
);

// Rutas protegidas para una película y categoría específicos
router.route('/:film_id/:category_id')
  .get(
    authenticateToken, 
    roleMiddleware(['Invitado', 'Cliente', 'Administrador']), // Todos los roles pueden acceder a la lectura
    filmCategoryController.show
  )
  .put(
    authenticateToken, 
    roleMiddleware(['Cliente', 'Administrador']), // Solo Cliente y Administrador pueden actualizar
    [
      body('new_film_id').notEmpty().withMessage('Film_id is required'),
      body('new_category_id').notEmpty().withMessage('Category_id is required')
    ],
    filmCategoryController.update
  )
  .delete(
    authenticateToken, 
    roleMiddleware(['Cliente', 'Administrador']), // Solo Cliente y Administrador pueden eliminar
    filmCategoryController.delete
  );

export default router;
