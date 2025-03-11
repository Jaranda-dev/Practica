import express from 'express'
import filmTextController from '../controllers/filmTextController.js'
const router = express.Router()

router.get('/', filmTextController.get)

export default router