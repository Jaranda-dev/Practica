import { prisma } from "../db.js"

class CityController {
    constructor() {

    }

    async get(req, res) {
        const ciudades = await prisma.city.findMany({
            include: {
                address: true,
                country: true
            }
        })
        res.json({data: ciudades})
    }
}

export default new CityController()