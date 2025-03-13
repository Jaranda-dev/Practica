import { prisma } from "../db.js"
import { validationResult } from "express-validator"

class ActorController {
    constructor() {

    }

    async get(req, res) {
        const actores = await prisma.actor.findMany({
            include: {
                film_actor: true
            }
        })
        res.json({data: actores})
    }

    async show(req, res) {
        const { id } = req.params

        const actor = await prisma.actor.findFirst({
            where: {actor_id: Number(id)}
        })

        res.status(200).json({data: actor})
    }

    async create(req, res) {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { first_name, last_name} = req.body

        try {
            const newActor = await prisma.actor.create({
                data: {
                    first_name,
                    last_name
                }
            })
            res.status(201).json({data: newActor})
        } catch (error) {
            res.status(500).send(error)
        }
    }

    async update(req, res) {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        
        const { id } = req.params
        const { first_name, last_name} = req.body

        try {
            const newActor = await prisma.actor.update({
                where: { actor_id: Number(id) },
                data: {
                    first_name,
                    last_name
                }
            })
            res.status(200).json({data: newActor})
        } catch (error) {
            res.status(500).send(error)
        }
    }

    async delete(req, res) {
        const { id } = req.params
        try {
            await prisma.film_actor.deleteMany({
                where: { actor_id: Number(id)}
            })
            await prisma.actor.delete({
                where: { actor_id: Number(id)}
            })
            res.status(200).json({data: "Actor eliminado"})
        } catch (error) {
            res.status(500).json(error)
        }
        
    }

    
}

export default new ActorController()