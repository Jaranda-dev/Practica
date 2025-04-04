import express from 'express';
import paymentController from '../controllers/paymentController.js';
import { body } from 'express-validator';
import { roleMiddleware } from '../Middleware.roles.js';
import { authenticateToken } from '../authenticateToken.js';

const router = express.Router();

// Ruta GET para obtener todos los pagos (solo lectura para todos los roles)
router.get(
  '/', 
  authenticateToken, 
  roleMiddleware(['Invitado', 'Cliente', 'Administrador']), // Todos los roles pueden acceder a la lectura
  paymentController.get
);

// Ruta POST para crear un pago (solo para Cliente o Administrador)
router.post(
  '/', 
  authenticateToken, 
  roleMiddleware(['Cliente', 'Administrador']), // Solo Cliente y Administrador pueden crear pagos
  [
    body('customer_id').isInt().withMessage('Customer ID must be an integer'),
    body('staff_id').isInt().withMessage('Staff ID must be an integer'),
    body('rental_id').isInt().withMessage('Rental ID must be an integer'),
    body('amount').isFloat({ gt: 0 }).withMessage('Amount must be a positive number'),
    body('payment_date').isISO8601().withMessage('Payment date must be a valid date')
  ],
  paymentController.create
);

// Rutas protegidas para un pago específico (ver, actualizar y eliminar)
router.route('/:id')
  .get(
    authenticateToken, 
    roleMiddleware(['Invitado', 'Cliente', 'Administrador']), // Todos los roles pueden acceder a la lectura
    paymentController.show
  )
  .put(
    authenticateToken, 
    roleMiddleware(['Cliente', 'Administrador']), // Solo Cliente y Administrador pueden actualizar
    [
      body('customer_id').isInt().withMessage('Customer ID must be an integer'),
      body('staff_id').isInt().withMessage('Staff ID must be an integer'),
      body('rental_id').isInt().withMessage('Rental ID must be an integer'),
      body('amount').isFloat({ gt: 0 }).withMessage('Amount must be a positive number'),
      body('payment_date').isISO8601().withMessage('Payment date must be a valid date')
    ],
    paymentController.update
  )
  .delete(
    authenticateToken, 
    roleMiddleware(['Cliente', 'Administrador']), // Solo Cliente y Administrador pueden eliminar
    paymentController.delete
  );

export default router;
