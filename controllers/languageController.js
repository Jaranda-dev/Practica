import { prisma } from "../db.js"

class LanguageController {
    constructor() {

    }

    async get(req, res) {
        const idiomas = await prisma.language.findMany({
            include: {
                film_film_language_idTolanguage: true,
                film_film_original_language_idTolanguage: true
            }
        })
        res.json({data: idiomas})
    }
}

export default new LanguageController()