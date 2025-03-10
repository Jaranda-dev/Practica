import { prisma } from "../db.js"

class AddressController {
    constructor() {

    }

    async get(req, res) {
        const direcciones = await prisma.address.findMany({
            include: {
                city: true,
                customer: true,
                staff: true,
                store: true
            }
        })
        res.json({data: direcciones})
    }
}

export default new AddressController()