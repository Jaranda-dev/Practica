import express from 'express';
import rentalController from '../controllers/rentalController.js';
import { body } from 'express-validator';
import { roleMiddleware } from '../Middleware.roles.js';
import { authenticateToken } from '../authenticateToken.js';

const router = express.Router();

// Ruta GET para obtener todos los alquileres (solo lectura para todos los roles)
router.get(
  '/', 
  authenticateToken, 
  roleMiddleware(['Invitado', 'Cliente', 'Administrador']), // Todos los roles pueden acceder a la lectura
  rentalController.get
);

// Ruta POST para crear un alquiler (solo para Cliente o Administrador)
router.post(
  '/', 
  authenticateToken, 
  roleMiddleware(['Cliente', 'Administrador']), // Solo Cliente y Administrador pueden crear alquileres
  [
    body('rental_date').isISO8601().withMessage('Rental date must be a valid date'),
    body('inventory_id').isInt().withMessage('Inventory ID must be an integer'),
    body('customer_id').isInt().withMessage('Customer ID must be an integer'),
    body('return_date').optional().isISO8601().withMessage('Return date must be a valid date'),
    body('staff_id').isInt().withMessage('Staff ID must be an integer')
  ],
  rentalController.create
);

// Rutas protegidas para un alquiler específico (ver, actualizar y eliminar)
router.route('/:id')
  .get(
    authenticateToken, 
    roleMiddleware(['Invitado', 'Cliente', 'Administrador']), // Todos los roles pueden acceder a la lectura
    rentalController.show
  )
  .put(
    authenticateToken, 
    roleMiddleware(['Cliente', 'Administrador']), // Solo Cliente y Administrador pueden actualizar
    [
      body('rental_date').isISO8601().withMessage('Rental date must be a valid date'),
      body('inventory_id').isInt().withMessage('Inventory ID must be an integer'),
      body('customer_id').isInt().withMessage('Customer ID must be an integer'),
      body('return_date').optional().isISO8601().withMessage('Return date must be a valid date'),
      body('staff_id').isInt().withMessage('Staff ID must be an integer')
    ],
    rentalController.update
  )
  .delete(
    authenticateToken, 
    roleMiddleware(['Cliente', 'Administrador']), // Solo Cliente y Administrador pueden eliminar
    rentalController.delete
  );

export default router;
