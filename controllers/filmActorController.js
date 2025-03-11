import { prisma } from "../db.js"

class FilmActorController {
    constructor() {

    }

    async get(req, res) {
        const actoresPeliculas = await prisma.film_actor.findMany({
            include: {
                actor: true,
                film: true
            }
        })
        res.json({data: actoresPeliculas})
    }
}

export default new FilmActorController()