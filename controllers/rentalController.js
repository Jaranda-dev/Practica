import { prisma } from "../db.js"

class RentalController {
    constructor() {

    }

    async get(req, res) {
        const alquileres = await prisma.rental.findMany({
            // include: {
            //     payment: true,
            //     customer: true,
            //     inventory: true,
            //     staff: true
            // }
        })
        res.json({data: alquileres})
    }
}

export default new RentalController()