import { prisma } from "../db.js"
import { validationResult } from "express-validator"

class FilmCategoryController {
    constructor() {

    }

    async get(req, res) {
        const peliculaCategorias = await prisma.film_category.findMany({
            include: {
                category: true,
                film: true
            }
        })
        res.json({data: peliculaCategorias})
    }

    async show(req, res) {
        const { film_id, category_id } = req.params

        try {
            const peliculaCategoria = await prisma.film_category.findFirst({
                where: {
                    film_id: Number(film_id),
                    category_id: Number(category_id)
                },
                include: {
                    category: true,
                    film: true
                }
            })

            if (!peliculaCategoria) {
                return res.status(404).json({ error: 'Actor o categoría no encontrado' })
            }

            res.status(200).json({ data: peliculaCategoria })
        } catch (error) {
            res.status(500).send(error)
        }
    }

    async create(req, res) {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { film_id, category_id } = req.body

        try {
            const newFilmCategory = await prisma.film_category.create({
                data: {
                    film_id,
                    category_id
                }
            })
            res.status(201).json({data: newFilmCategory})
        } catch (error) {
            res.status(500).send(error)
        }
    }

    async update(req, res) {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        
        const { film_id, category_id } = req.params
        const { new_film_id, new_category_id } = req.body

        try {
            const newFilmCategory = await prisma.film_category.update({
                where: {
                    film_id_category_id: {
                        film_id: Number(film_id),
                        category_id: Number(category_id)
                    }
                },
                data: {
                    film_id: new_film_id,
                    category_id: new_category_id
                }
            })
            res.status(200).json({data: newFilmCategory})
        } catch (error) {
            console.log(error)
            res.status(500).send(error)
        }
    }

    async delete(req, res) {
        const { film_id, category_id } = req.params
        try {
            await prisma.film_category.delete({
                where: {
                    film_id_category_id: {
                        film_id: Number(film_id),
                        category_id: Number(category_id)
                    }
                }
            })
            res.status(200).json({data: "Pelicula Categoría eliminado"})
        } catch (error) {
            res.status(500).json(error)
        }
        
    }
}

export default new FilmCategoryController()