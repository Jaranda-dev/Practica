import { prisma } from "../db.js"

class ActorController {
    constructor() {

    }

    async get(req, res) {
        const actores = await prisma.actor.findMany()
        res.json({data: actores})
    }
}

export default new ActorController()