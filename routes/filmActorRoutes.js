import express from 'express';
import filmActorController from '../controllers/filmActorController.js';
import { body } from 'express-validator';
import { roleMiddleware } from '../Middleware.roles.js';
import { authenticateToken } from '../authenticateToken.js';

const router = express.Router();

// Ruta GET para obtener todos los film-actor
router.get(
  '/', 
  authenticateToken, 
  roleMiddleware(['Invitado', 'Cliente', 'Administrador']),
  filmActorController.get
);

// Ruta POST para crear un film-actor (solo para Cliente o Administrador)
router.post(
  '/', 
  authenticateToken, 
  roleMiddleware(['Cliente', 'Administrador']),
  [
    body('film_id').notEmpty().withMessage('Film_id is required'),
    body('actor_id').notEmpty().withMessage('Actor_id is required')
  ],
  filmActorController.create
);

// Rutas protegidas para una película y actor específicos
router.route('/:film_id/:actor_id')
  .get(
    authenticateToken, 
    roleMiddleware(['Invitado', 'Cliente', 'Administrador']),
    filmActorController.show
  )
  .put(
    authenticateToken, 
    roleMiddleware(['Cliente', 'Administrador']),
    [
      body('new_film_id').notEmpty().withMessage('Film_id is required'),
      body('new_actor_id').notEmpty().withMessage('Actor_id is required')
    ],
    filmActorController.update
  )
  .delete(
    authenticateToken, 
    roleMiddleware(['Cliente', 'Administrador']),
    filmActorController.delete
  );

export default router;
