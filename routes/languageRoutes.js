import express from 'express'
import languageController from '../controllers/languageController.js'
const router = express.Router()

router.get('/', languageController.get)

export default router