import express from 'express';
import staffController from '../controllers/staffController.js';
import { body } from 'express-validator';

const router = express.Router();

router.get('/', staffController.get);
router.post(
    '/',
    [
        body('first_name').notEmpty().withMessage('First name is required'),
        body('last_name').notEmpty().withMessage('Last name is required'),
        body('address_id').isInt().withMessage('Address ID must be an integer'),
        body('email').isEmail().withMessage('Valid email is required'),
        body('store_id').isInt().withMessage('Store ID must be an integer'),
        body('username').notEmpty().withMessage('Username is required'),
        body('password').notEmpty().withMessage('Password is required'),
        body('active').isBoolean().withMessage('Active must be a boolean')
    ],
    staffController.create
);

router.route('/:id')
    .get(staffController.show)
    .put(
        [
            body('first_name').notEmpty().withMessage('First name is required'),
            body('last_name').notEmpty().withMessage('Last name is required'),
            body('address_id').isInt().withMessage('Address ID must be an integer'),
            body('email').isEmail().withMessage('Valid email is required'),
            body('store_id').isInt().withMessage('Store ID must be an integer'),
            body('username').notEmpty().withMessage('Username is required'),
            body('password').notEmpty().withMessage('Password is required'),
            body('active').isBoolean().withMessage('Active must be a boolean')
        ],
        staffController.update
    )
    .delete(staffController.delete);

export default router;