import express from 'express'
import cityController from '../controllers/cityController.js'
const router = express.Router()

router.get('/', cityController.get)

export default router