import express from 'express';
import rentalController from '../controllers/rentalController.js';
import { body } from 'express-validator';

const router = express.Router();

router.get('/', rentalController.get);
router.post(
    '/',
    [
        body('rental_date').isISO8601().withMessage('Rental date must be a valid date'),
        body('inventory_id').isInt().withMessage('Inventory ID must be an integer'),
        body('customer_id').isInt().withMessage('Customer ID must be an integer'),
        body('return_date').optional().isISO8601().withMessage('Return date must be a valid date'),
        body('staff_id').isInt().withMessage('Staff ID must be an integer')
    ],
    rentalController.create
);

router.route('/:id')
    .get(rentalController.show)
    .put(
        [
            body('rental_date').isISO8601().withMessage('Rental date must be a valid date'),
            body('inventory_id').isInt().withMessage('Inventory ID must be an integer'),
            body('customer_id').isInt().withMessage('Customer ID must be an integer'),
            body('return_date').optional().isISO8601().withMessage('Return date must be a valid date'),
            body('staff_id').isInt().withMessage('Staff ID must be an integer')
        ],
        rentalController.update
    )
    .delete(rentalController.delete);

export default router;