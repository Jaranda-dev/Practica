import { prisma } from "../db.js"

class StoreController {
    constructor() {

    }

    async get(req, res) {
        const tiendas = await prisma.store.findMany({
            include: {
                customer: true,
                inventory: true,
                staff_staff_store_idTostore: true,
                address: true,
                staff_store_manager_staff_idTostaff: true
            }
        })
        res.json({data: tiendas})
    }
}

export default new StoreController()