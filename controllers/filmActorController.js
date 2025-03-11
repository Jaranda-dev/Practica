import { prisma } from "../db.js"
import { validationResult } from "express-validator"

class FilmActorController {
    constructor() {

    }

    async get(req, res) {
        const actoresPeliculas = await prisma.film_actor.findMany({
            include: {
                actor: true,
                film: true
            }
        })
        res.json({data: actoresPeliculas})
    }

    async show(req, res) {
        const { film_id, actor_id } = req.params

        try {
            const actorPelicula = await prisma.film_actor.findFirst({
                where: {
                    film_id: Number(film_id),
                    actor_id: Number(actor_id)
                },
                include: {
                    actor: true,
                    film: true
                }
            })

            if (!actorPelicula) {
                return res.status(404).json({ error: 'Actor o película no encontrado' })
            }

            res.status(200).json({ data: actorPelicula })
        } catch (error) {
            res.status(500).send(error)
        }
    }

    async create(req, res) {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { film_id, actor_id } = req.body

        try {
            const newFilmActor = await prisma.film_actor.create({
                data: {
                    film_id,
                    actor_id
                }
            })
            res.status(201).json({data: newFilmActor})
        } catch (error) {
            res.status(500).send(error)
        }
    }

    async update(req, res) {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        
        const { film_id, actor_id } = req.params
        const { new_film_id, new_actor_id } = req.body

        try {
            const newFilmActor = await prisma.film_actor.update({
                where: {
                    actor_id_film_id: {
                        film_id: Number(film_id),
                        actor_id: Number(actor_id)
                    }
                },
                data: {
                    film_id: new_film_id,
                    actor_id: new_actor_id
                }
            })
            res.status(200).json({data: newFilmActor})
        } catch (error) {
            console.log(error)
            res.status(500).send(error)
        }
    }

    async delete(req, res) {
        const { film_id, actor_id } = req.params
        try {
            await prisma.film_actor.delete({
                where: {
                    actor_id_film_id: {
                        film_id: Number(film_id),
                        actor_id: Number(actor_id)
                    }
                }
            })
            res.status(200).json({data: "Pelicula Actor eliminado"})
        } catch (error) {
            res.status(500).json(error)
        }
        
    }
}

export default new FilmActorController()