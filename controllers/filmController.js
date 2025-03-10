import { prisma } from "../db.js"

class FilmController {
    constructor() {

    }

    async get(req, res) {
        const peliculas = await prisma.film.findMany({
            include: {
                language_film_language_idTolanguage: true,
                language_film_original_language_idTolanguage: true,
                film_actor: true,
                film_category:true,
                inventory: true
            }
        })
        res.json({data: peliculas})
    }
}

export default new FilmController()