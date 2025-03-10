import express from 'express'
import customerController from '../controllers/customerController.js'
const router = express.Router()

router.get('/', customerController.get)

export default router