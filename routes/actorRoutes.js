import express from 'express'
import actorController from '../controllers/actorController.js'
const router = express.Router()

router.get('/', actorController.get)

export default router