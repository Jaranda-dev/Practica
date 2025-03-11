import express from 'express';
import inventoryController from '../controllers/inventoryController.js';
import { body } from 'express-validator';

const router = express.Router();

router.get('/', inventoryController.get);
router.post(
    '/',
    [
        body('film_id').isInt().withMessage('Film ID must be an integer'),
        body('store_id').isInt().withMessage('Store ID must be an integer'),
    ],
    inventoryController.create
);

router.route('/:id')
    .get(inventoryController.show)
    .put(
        [
            body('film_id').isInt().withMessage('Film ID must be an integer'),
            body('store_id').isInt().withMessage('Store ID must be an integer'),
        ],
        inventoryController.update
    )
    .delete(inventoryController.delete);

export default router;