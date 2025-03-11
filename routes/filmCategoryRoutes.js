import express from 'express'
import filmCategoryController from '../controllers/filmCategoryController.js'
import { body } from 'express-validator'
const router = express.Router()

router.get('/', filmCategoryController.get)
router.post(
    '/',
    [
        body('film_id').notEmpty().withMessage('Film_id is required'),
        body('category_id').notEmpty().withMessage('Category_id is required')
    ],
    filmCategoryController.create
)

router.route('/:film_id/:category_id')
    .get(filmCategoryController.show)
    .put(
    [
        body('new_film_id').notEmpty().withMessage('Film_id is required'),
        body('new_category_id').notEmpty().withMessage('Category_id is required')
    ],
    filmCategoryController.update
    )
    .delete(filmCategoryController.delete)

export default router