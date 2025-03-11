import express from 'express'
import customerController from '../controllers/customerController.js'
import { body } from 'express-validator'
const router = express.Router()

router.get('/', customerController.get)

router.post(
    '/',
    [
        body('store_id').notEmpty().withMessage('Store id is required'),
        body('first_name').notEmpty().withMessage('First name is required'),
        body('last_name').notEmpty().withMessage('Last name is required'),
        body('email').isEmail().notEmpty().withMessage('Last name is required'),
        body('address_id').notEmpty().withMessage('Address id is required')
    ],
    customerController.create
)

router.route('/:id')
    .get(customerController.show)
    .put(
    [
        body('store_id').notEmpty().withMessage('Store id is required'),
        body('first_name').notEmpty().withMessage('First name is required'),
        body('last_name').notEmpty().withMessage('Last name is required'),
        body('email').isEmail().notEmpty().withMessage('Last name is required'),
        body('address_id').notEmpty().withMessage('Address id is required')
    ],
    customerController.update
    )
    .delete(customerController.delete)

export default router