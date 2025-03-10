import { prisma } from "../db.js"

class PaymentController {
    constructor() {

    }

    async get(req, res) {
        const pagos = await prisma.payment.findMany({
            // include: {
            //     customer: true,
            //     rental: true,
            //     staff: true
            // }
        })
        res.json({data: pagos})
    }
}

export default new PaymentController()