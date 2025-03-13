import { prisma } from "../db.js";
import { validationResult } from "express-validator";

class InventoryController {
    async get(req, res) {
        try {
            const inventories = await prisma.inventory.findMany({
                include: {
                    film: true,
                    store: true,
                    rental: true
                }
            });
            res.json({ data: inventories });
        } catch (error) {
            res.status(500).json({ error: "Error al obtener los inventarios." });
        }
    }

    async show(req, res) {
        try {
            const { id } = req.params;
            const inventory = await prisma.inventory.findUnique({
                where: { inventory_id: Number(id) },
                include: {
                    film: true,
                    store: true,
                    rental: true
                }
            });
            if (!inventory) return res.status(404).json({ error: "Inventario no encontrado." });
            res.json({ data: inventory });
        } catch (error) {
            res.status(500).json({ error: "Error al obtener el inventario." });
        }
    }

    async create(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const { film_id, store_id } = req.body;
            const newInventory = await prisma.inventory.create({
                data: {
                    film_id,
                    store_id,
                    last_update: new Date()
                }
            });
            res.status(201).json({ data: newInventory });
        } catch (error) {
            res.status(500).json({ error: "Error al crear el inventario." });
        }
    }

    async update(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            
            const { id } = req.params;
            const { film_id, store_id } = req.body;
            const updatedInventory = await prisma.inventory.update({
                where: { inventory_id: Number(id) },
                data: {
                    film_id,
                    store_id,
                    last_update: new Date()
                }
            });
            res.json({ data: updatedInventory });
        } catch (error) {
            res.status(500).json({ error: "Error al actualizar el inventario." });
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params;
            await prisma.rental.deleteMany({ where: { inventory_id: Number(id) } });
            await prisma.inventory.delete({ where: { inventory_id: Number(id) } });
            res.json({ message: "Inventario eliminado correctamente." });
        } catch (error) {
            res.status(500).json({ error: "Error al eliminar el inventario." });
        }
    }
}

export default new InventoryController();