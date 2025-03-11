import { prisma } from "../db.js";
import { validationResult } from "express-validator";

class FilmTextController {
    async get(res) {
        try {
            const filmTexts = await prisma.film_text.findMany();
            res.json({ data: filmTexts });
        } catch (error) {
            res.status(500).json({ error: "Error al obtener los textos de películas." });
        }
    }

    async show(req, res) {
        try {
            const { id } = req.params;
            const filmText = await prisma.film_text.findUnique({
                where: { film_id: Number(id) }
            });
            if (!filmText) return res.status(404).json({ error: "Texto de película no encontrado." });
            res.json({ data: filmText });
        } catch (error) {
            res.status(500).json({ error: "Error al obtener el texto de la película." });
        }
    }

    async create(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const { film_id, title, description } = req.body;
            const newFilmText = await prisma.film_text.create({
                data: {
                    film_id,
                    title,
                    description
                }
            });
            res.status(201).json({ data: newFilmText });
        } catch (error) {
            res.status(500).json({ error: "Error al crear el texto de la película." });
        }
    }

    async update(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            
            const { id } = req.params;
            const { title, description } = req.body;
            const updatedFilmText = await prisma.film_text.update({
                where: { film_id: Number(id) },
                data: {
                    title,
                    description
                }
            });
            res.json({ data: updatedFilmText });
        } catch (error) {
            res.status(500).json({ error: "Error al actualizar el texto de la película." });
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params;
            await prisma.film_text.delete({ where: { film_id: Number(id) } });
            res.json({ message: "Texto de película eliminado correctamente." });
        } catch (error) {
            res.status(500).json({ error: "Error al eliminar el texto de la película." });
        }
    }
}

export default new FilmTextController();