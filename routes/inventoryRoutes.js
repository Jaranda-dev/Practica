import express from 'express'
import inventoryController from '../controllers/inventoryController.js'
const router = express.Router()

router.get('/', inventoryController.get)

export default router