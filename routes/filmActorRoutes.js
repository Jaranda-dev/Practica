import express from 'express'
import filmActorController from '../controllers/filmActorController.js'
const router = express.Router()

router.get('/', filmActorController.get)

export default router