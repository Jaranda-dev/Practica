import express from 'express';
import filmTextController from '../controllers/filmTextController.js';
import { body } from 'express-validator';

const router = express.Router();

router.get('/', filmTextController.get);
router.post(
    '/',
    [
        body('film_id').isInt().withMessage('Film ID must be an integer'),
        body('title').isString().trim().notEmpty().withMessage('Title is required and must be a non-empty string'),
        body('description').optional().isString().trim().withMessage('Description must be a string')
    ],
    filmTextController.create
);

router.route('/:id')
    .get(filmTextController.show)
    .put(
        [
            body('title').optional().isString().trim().notEmpty().withMessage('Title must be a non-empty string'),
            body('description').optional().isString().trim().withMessage('Description must be a string')
        ],
        filmTextController.update
    )
    .delete(filmTextController.delete);

export default router;