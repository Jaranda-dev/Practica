import express from 'express'
import filmCategoryController from '../controllers/filmCategoryController.js'
const router = express.Router()

router.get('/', filmCategoryController.get)

export default router