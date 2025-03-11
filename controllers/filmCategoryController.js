import { prisma } from "../db.js"

class FilmCategoryController {
    constructor() {

    }

    async get(req, res) {
        const peliculaCategorias = await prisma.film_category.findMany({
            include: {
                category: true,
                film: true
            }
        })
        res.json({data: peliculaCategorias})
    }
}

export default new FilmCategoryController()