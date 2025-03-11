import { prisma } from "../db.js"
import { validationResult } from "express-validator"

class FilmController {
    constructor() {

    }

    async get(req, res) {
        const peliculas = await prisma.film.findMany({
            include: {
                language_film_language_idTolanguage: true,
                language_film_original_language_idTolanguage: true,
                film_actor: true,
                film_category:true,
                inventory: true
            }
        })
        res.json({data: peliculas})
    }

    async show(req, res) {
        const { id } = req.params

        const pelicula = await prisma.film.findFirst({
            where: {film_id: Number(id)}
        })

        res.status(200).json({data: pelicula})
    }

    async create(req, res) {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { title, description, release_year, language_id, original_language_id, rental_duration, rental_rate, length, replacement_cost, rating, special_features } = req.body

        try {
            const newFilm = await prisma.film.create({
                data: {
                    title,
                    description,
                    release_year,
                    language_id,
                    original_language_id,
                    rental_duration,
                    rental_rate,
                    length,
                    replacement_cost,
                    rating,
                    special_features
                }
            })
            res.status(201).json({data: newFilm})
        } catch (error) {
            console.log(error)
            res.status(500).send(error)
        }
    }

    async update(req, res) {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        
        const { id } = req.params
        const { title, description, release_year, language_id, original_language_id, rental_duration, rental_rate, length, replacement_cost, rating, special_features } = req.body
        

        try {
            const newFilm = await prisma.film.update({
                where: { film_id: Number(id) },
                data: {
                    title,
                    description,
                    release_year,
                    language_id,
                    original_language_id,
                    rental_duration,
                    rental_rate,
                    length,
                    replacement_cost,
                    rating,
                    special_features
                }
            })
            res.status(200).json({data: newFilm})
        } catch (error) {
            console.log(error)
            res.status(500).send(error)
        }
    }

    async delete(req, res) {
        const { id } = req.params
        try {
            await prisma.film.delete({
                where: { film_id: Number(id)}
            })
            res.status(200).json({data: "Pelicula eliminada"})
        } catch (error) {
            res.status(500).json(error)
        }
        
    }
}

export default new FilmController()