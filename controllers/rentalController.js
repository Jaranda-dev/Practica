import { prisma } from "../db.js";
import { validationResult } from "express-validator";

class RentalController {
    async get(req, res) {
        try {
            const rentals = await prisma.rental.findMany({
                include: {
                    payment: true,
                    // customer: true,
                    inventory: true,
                    // staff: true
                }
            });
            res.json({ data: rentals });
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: "Error al obtener los alquileres." });
        }
    }

    async show(req, res) {
        try {
            const { id } = req.params;
            const rental = await prisma.rental.findUnique({
                where: { rental_id: Number(id) },
                include: {
                    payment: true,
                    customer: true,
                    inventory: true,
                    staff: true
                }
            });
            if (!rental) return res.status(404).json({ error: "Alquiler no encontrado." });
            res.json({ data: rental });
        } catch (error) {
            res.status(500).json({ error: "Error al obtener el alquiler." });
        }
    }

    async create(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const { rental_date, inventory_id, customer_id, return_date, staff_id } = req.body;
            const newRental = await prisma.rental.create({
                data: {
                    rental_date,
                    inventory_id,
                    customer_id,
                    return_date,
                    staff_id,
                    last_update: new Date()
                }
            });
            res.status(201).json({ data: newRental });
        } catch (error) {
            res.status(500).json({ error: "Error al crear el alquiler." });
        }
    }

    async update(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            
            const { id } = req.params;
            const { rental_date, inventory_id, customer_id, return_date, staff_id } = req.body;
            const updatedRental = await prisma.rental.update({
                where: { rental_id: Number(id) },
                data: {
                    rental_date,
                    inventory_id,
                    customer_id,
                    return_date,
                    staff_id,
                    last_update: new Date()
                }
            });
            res.json({ data: updatedRental });
        } catch (error) {
            res.status(500).json({ error: "Error al actualizar el alquiler." });
        }
    }

    delete(req, res) {
        try {
            const { id } = req.params;
            prisma.payment.delete({ where: { rental_id: Number(id) } });
            prisma.rental.delete({ where: { rental_id: Number(id) } });
            res.json({ message: "Alquiler eliminado correctamente." });
        } catch (error) {
            res.status(500).json({ error: "Error al eliminar el alquiler." });
        }
    }
}

export default new RentalController();
