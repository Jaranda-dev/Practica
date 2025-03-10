import express from 'express'
import rentalController from '../controllers/rentalController.js'
const router = express.Router()

router.get('/', rentalController.get)

export default router