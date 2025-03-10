import { prisma } from "../db.js"

class CategoryController {
    constructor() {

    }

    async get(req, res) {
        const categorias = await prisma.category.findMany({
            include: {
                film_category: true
            }
        })
        res.json({data: categorias})
    }
}

export default new CategoryController()