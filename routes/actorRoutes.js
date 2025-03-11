import express from 'express'
import actorController from '../controllers/actorController.js'
import { body } from 'express-validator'
const router = express.Router()

router.get('/', actorController.get)
router.get('/:id', actorController.show)
router.post(
    '/',
    [
        body('first_name').notEmpty().withMessage('First name is required'),
        body('last_name').notEmpty().withMessage('Last name is required')
    ],
    actorController.create
)
router.put(
    '/:id',
    [
        body('first_name').notEmpty().withMessage('First name is required'),
        body('last_name').notEmpty().withMessage('Last name is required')
    ],
    actorController.update
)
router.delete('/:id', actorController.delete)

export default router