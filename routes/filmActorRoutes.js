import express from 'express'
import filmActorController from '../controllers/filmActorController.js'
import { body } from 'express-validator'
const router = express.Router()

router.get('/', filmActorController.get)
router.post(
    '/',
    [
        body('film_id').notEmpty().withMessage('Film_id is required'),
        body('actor_id').notEmpty().withMessage('Actor_id is required')
    ],
    filmActorController.create
)

router.route('/:film_id/:actor_id')
    .get(filmActorController.show)
    .put(
    [
        body('new_film_id').notEmpty().withMessage('Film_id is required'),
        body('new_actor_id').notEmpty().withMessage('Actor_id is required')
    ],
    filmActorController.update
    )
    .delete(filmActorController.delete)

export default router