import { prisma } from "../db.js"

class StaffController {
    constructor() {

    }

    async get(req, res) {
        const personal = await prisma.staff.findMany({
            include: {
                // payment: true,
                // rental: true,
                // address: true,
                // store_staff_store_idTostore: true,
                // store_store_manager_staff_idTostaff: true
            }
        })
        res.json({data: personal})
    }
}

export default new StaffController()