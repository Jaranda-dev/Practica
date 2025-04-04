import express from 'express';
import customerController from '../controllers/customerController.js';
import { body } from 'express-validator';
import { roleMiddleware } from '../Middleware.roles.js';
import { authenticateToken } from '../authenticateToken.js';

const router = express.Router();

// Ruta para obtener todos los clientes (acceso de lectura para Invitado, Cliente y Administrador)
router.get(
  '/',  
  authenticateToken, 
  roleMiddleware(['Invitado', 'Cliente', 'Administrador']), // Acceso de lectura para Invitado, Cliente y Administrador
  customerController.get
);

// Ruta para crear un cliente (acceso solo para Cliente y Administrador)
router.post(
  '/', 
  authenticateToken, 
  roleMiddleware(['Cliente', 'Administrador']), // Solo Cliente y Administrador pueden crear clientes
  [
    body('store_id').notEmpty().withMessage('Store id is required'),
    body('first_name').notEmpty().withMessage('First name is required'),
    body('last_name').notEmpty().withMessage('Last name is required'),
    body('email').isEmail().notEmpty().withMessage('Email is required'),
    body('address_id').notEmpty().withMessage('Address id is required')
  ],
  customerController.create
);

// Rutas para un cliente específico (ver, actualizar y eliminar)
router.route('/:id')
  .get(
    authenticateToken, 
    roleMiddleware(['Invitado', 'Cliente', 'Administrador']), // Acceso de lectura para todos los roles
    customerController.show
  )
  .put(
    authenticateToken, 
    roleMiddleware(['Cliente', 'Administrador']), // Solo Cliente y Administrador pueden actualizar un cliente
    [
      body('store_id').notEmpty().withMessage('Store id is required'),
      body('first_name').notEmpty().withMessage('First name is required'),
      body('last_name').notEmpty().withMessage('Last name is required'),
      body('email').isEmail().notEmpty().withMessage('Email is required'),
      body('address_id').notEmpty().withMessage('Address id is required')
    ],
    customerController.update
  )
  .delete(
    authenticateToken, 
    roleMiddleware(['Cliente', 'Administrador']), // Solo Cliente y Administrador pueden eliminar un cliente
    customerController.delete
  );

export default router;
