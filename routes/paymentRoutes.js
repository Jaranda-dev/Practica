import express from 'express';
import paymentController from '../controllers/paymentController.js';
import { body } from 'express-validator';

const router = express.Router();

router.get('/', paymentController.get);
router.post(
    '/',
    [
        body('customer_id').isInt().withMessage('Customer ID must be an integer'),
        body('staff_id').isInt().withMessage('Staff ID must be an integer'),
        body('rental_id').isInt().withMessage('Rental ID must be an integer'),
        body('amount').isFloat({ gt: 0 }).withMessage('Amount must be a positive number'),
        body('payment_date').isISO8601().withMessage('Payment date must be a valid date')
    ],
    paymentController.create
);

router.route('/:id')
    .get(paymentController.show)
    .put(
        [
            body('customer_id').isInt().withMessage('Customer ID must be an integer'),
            body('staff_id').isInt().withMessage('Staff ID must be an integer'),
            body('rental_id').isInt().withMessage('Rental ID must be an integer'),
            body('amount').isFloat({ gt: 0 }).withMessage('Amount must be a positive number'),
            body('payment_date').isISO8601().withMessage('Payment date must be a valid date')
        ],
        paymentController.update
    )
    .delete(paymentController.delete);

export default router;