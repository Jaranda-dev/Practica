import express from 'express'
import countryController from '../controllers/countryController.js'
const router = express.Router()

router.get('/', countryController.get)

export default router