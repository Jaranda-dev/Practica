class EstudiantesController {
    constructor() {

    }

    get(req, res) {
        return res.json({msg: "Hola papu"})
    }
}

module.exports = new EstudiantesController();