import express from 'express'
import staffController from '../controllers/staffController.js'
const router = express.Router()

router.get('/', staffController.get)

export default router