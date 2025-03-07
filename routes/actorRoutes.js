const express = require('express')
const actorController = require('../controllers/actorController.js')
const router = express.Router()

router.get('/', actorController.get)

module.exports = router