import express from 'express'
import addressController from '../controllers/addressController.js'
const router = express.Router()

router.get('/', addressController.get)

export default router