import express from 'express'
import filmController from '../controllers/filmController.js'
const router = express.Router()

router.get('/', filmController.get)

export default router