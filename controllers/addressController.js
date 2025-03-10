import { prisma } from "../db.js"

class AddressController {
    constructor() {

    }

    async get(req, res) {
        const actores = await prisma.address.findMany({
            include: {
                city: true,
                customer: true,
                staff: true,
                store: true
            }
        })
        res.json({data: actores})
    }
}

export default new AddressController()