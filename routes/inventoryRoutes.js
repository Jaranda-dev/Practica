import express from 'express';
import inventoryController from '../controllers/inventoryController.js';
import { body } from 'express-validator';
import { roleMiddleware } from '../Middleware.roles.js';
import { authenticateToken } from '../authenticateToken.js';

const router = express.Router();

// Ruta GET para obtener todos los inventarios
router.get(
  '/', 
  authenticateToken, 
  roleMiddleware(['Invitado', 'Cliente', 'Administrador']), // Todos los roles pueden acceder a la lectura
  inventoryController.get
);

// Ruta POST para crear un inventario (solo para Cliente o Administrador)
router.post(
  '/', 
  authenticateToken, 
  roleMiddleware(['Cliente', 'Administrador']), // Solo Cliente y Administrador pueden crear inventarios
  [
    body('film_id').isInt().withMessage('Film ID must be an integer'),
    body('store_id').isInt().withMessage('Store ID must be an integer'),
  ],
  inventoryController.create
);

// Rutas protegidas para un inventario específico (ver, actualizar y eliminar)
router.route('/:id')
  .get(
    authenticateToken, 
    roleMiddleware(['Invitado', 'Cliente', 'Administrador']), // Todos los roles pueden acceder a la lectura
    inventoryController.show
  )
  .put(
    authenticateToken, 
    roleMiddleware(['Cliente', 'Administrador']), // Solo Cliente y Administrador pueden actualizar
    [
      body('film_id').isInt().withMessage('Film ID must be an integer'),
      body('store_id').isInt().withMessage('Store ID must be an integer'),
    ],
    inventoryController.update
  )
  .delete(
    authenticateToken, 
    roleMiddleware(['Cliente', 'Administrador']), // Solo Cliente y Administrador pueden eliminar
    inventoryController.delete
  );

export default router;
