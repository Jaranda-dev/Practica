import { prisma } from "../db.js";
import { validationResult } from "express-validator";

class StaffController {
    async get(req, res) {
        try {
            const staff = await prisma.staff.findMany({
                include: {
                    address: true,
                    store_staff_store_idTostore: true,
                    store_store_manager_staff_idTostaff: true
                }
            });
            res.json({ data: staff });
        } catch (error) {
            res.status(500).json({ error: "Error al obtener el personal." });
        }
    }

    async show(req, res) {
        try {
            const { id } = req.params;
            const staff = await prisma.staff.findUnique({
                where: { staff_id: Number(id) },
                include: {
                    address: true,
                    store_staff_store_idTostore: true,
                    store_store_manager_staff_idTostaff: true
                }
            });
            if (!staff) return res.status(404).json({ error: "Staff no encontrado." });
            res.json({ data: staff });
        } catch (error) {
            res.status(500).json({ error: "Error al obtener el personal." });
        }
    }

    async create(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const { first_name, last_name, address_id, email, store_id, username, password, active } = req.body;
            const newStaff = await prisma.staff.create({
                data: {
                    first_name,
                    last_name,
                    address_id,
                    email,
                    store_id,
                    username,
                    password,
                    active
                }
            });
            res.status(201).json({ data: newStaff });
        } catch (error) {
            res.status(500).json({ error: "Error al crear el staff." });
        }
    }

    async update(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            
            const { id } = req.params;
            const { first_name, last_name, address_id, email, store_id, username, password, active } = req.body;
            const updatedStaff = await prisma.staff.update({
                where: { staff_id: Number(id) },
                data: {
                    first_name,
                    last_name,
                    address_id,
                    email,
                    store_id,
                    username,
                    password,
                    active
                }
            });
            res.json({ data: updatedStaff });
        } catch (error) {
            res.status(500).json({ error: "Error al actualizar el staff." });
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params;
            await prisma.staff.delete({ where: { staff_id: Number(id) } });
            res.json({ message: "Staff eliminado correctamente." });
        } catch (error) {
            res.status(500).json({ error: "Error al eliminar el staff." });
        }
    }
}

export default new StaffController();
