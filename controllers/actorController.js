const db = require('../database/connection.js')

class EstudiantesController {
    constructor() {

    }

    get(req, res) {
        return res.json({msg: "Hola papu"})
    }
}

module.exports = new EstudiantesController();