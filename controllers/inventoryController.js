import { prisma } from "../db.js"

class InventoryController {
    constructor() {

    }

    async get(req, res) {
        const inventarios = await prisma.inventory.findMany({
            include: {
                // film: true,
                // store: true,
                // rental: true
            }
        })
        res.json({data: inventarios})
    }
}

export default new InventoryController()