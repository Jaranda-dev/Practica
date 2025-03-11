import express from 'express'
import filmController from '../controllers/filmController.js'
import { body } from 'express-validator'
const router = express.Router()

router.get('/', filmController.get)

router.post(
    '/',
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
)

router.route('/:id')
    .get(filmController.show)
    .put(
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
    .delete(filmController.delete)
export default router