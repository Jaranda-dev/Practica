import { prisma } from "../db.js"

class CountryController {
    constructor() {

    }

    async get(req, res) {
        const paises = await prisma.country.findMany({
            include: {
                city: true
            }
        })
        res.json({data: paises})
    }
}

export default new CountryController()