import express from 'express';
import staffController from '../controllers/staffController.js';
import { body } from 'express-validator';
import { roleMiddleware } from '../Middleware.roles.js';
import { authenticateToken } from '../authenticateToken.js';

const router = express.Router();

// Ruta GET para obtener todos los registros de staff (solo lectura para los roles 'Invitado', 'Cliente' y 'Administrador')
router.get(
  '/', 
  authenticateToken, 
  roleMiddleware(['Invitado', 'Cliente', 'Administrador']), // Permitir solo lectura a estos roles
  staffController.get
);

// Ruta POST para crear un nuevo staff (solo accesible para 'Administrador')
router.post(
  '/', 
  authenticateToken, 
  roleMiddleware(['Administrador']), // Solo Administrador puede crear un nuevo staff
  [
    body('first_name').notEmpty().withMessage('First name is required'),
    body('last_name').notEmpty().withMessage('Last name is required'),
    body('address_id').isInt().withMessage('Address ID must be an integer'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('store_id').isInt().withMessage('Store ID must be an integer'),
    body('username').notEmpty().withMessage('Username is required'),
    body('password').notEmpty().withMessage('Password is required'),
    body('active').isBoolean().withMessage('Active must be a boolean')
  ],
  staffController.create
);

// Rutas protegidas para un staff específico (ver, actualizar, y eliminar)
router.route('/:id')
  .get(
    authenticateToken, 
    roleMiddleware(['Invitado', 'Cliente', 'Administrador']), // Permitir solo lectura a estos roles
    staffController.show
  )
  .put(
    authenticateToken, 
    roleMiddleware(['Administrador']), // Solo el Administrador puede actualizar
    [
      body('first_name').notEmpty().withMessage('First name is required'),
      body('last_name').notEmpty().withMessage('Last name is required'),
      body('address_id').isInt().withMessage('Address ID must be an integer'),
      body('email').isEmail().withMessage('Valid email is required'),
      body('store_id').isInt().withMessage('Store ID must be an integer'),
      body('username').notEmpty().withMessage('Username is required'),
      body('password').notEmpty().withMessage('Password is required'),
      body('active').isBoolean().withMessage('Active must be a boolean'),
      body('roleId').isInt().withMessage('Role ID must be an integer')
    ],
    staffController.update
  )
  .delete(
    authenticateToken, 
    roleMiddleware(['Administrador']), // Solo el Administrador puede eliminar un staff
    staffController.delete
  );

export default router;
