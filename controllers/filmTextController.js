import { prisma } from "../db.js"

class FilmTextController {
    constructor() {

    }

    async get(req, res) {
        const peliculasTextos = await prisma.film_text.findMany()
        res.json({data: peliculasTextos})
    }
}

export default new FilmTextController()