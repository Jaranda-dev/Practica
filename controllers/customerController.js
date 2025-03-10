import { prisma } from "../db.js"

class CustomerController {
    constructor() {

    }

    async get(req, res) {
        const clientes = await prisma.customer.findMany({
            // include: {
            //     address: true,
            //     store: true,
            //     payment: true,
            //     rental: true
            // }
        })
        res.json({data: clientes})
    }
}

export default new CustomerController()