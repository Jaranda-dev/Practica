import { prisma } from "../db.js";
import { validationResult } from "express-validator";

class PaymentController {
    async get(req, res) {
        try {
            const payments = await prisma.payment.findMany({
                include: {
                    customer: true,
                    rental: true,
                    staff: true
                }
            });
            res.json({ data: payments });
        } catch (error) {
            res.status(500).json({ error: "Error al obtener los pagos." });
        }
    }

    async show(req, res) {
        try {
            const { id } = req.params;
            const payment = await prisma.payment.findUnique({
                where: { payment_id: Number(id) },
                include: {
                    customer: true,
                    rental: true,
                    staff: true
                }
            });
            if (!payment) return res.status(404).json({ error: "Pago no encontrado." });
            res.json({ data: payment });
        } catch (error) {
            res.status(500).json({ error: "Error al obtener el pago." });
        }
    }

    async create(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const { customer_id, staff_id, rental_id, amount, payment_date } = req.body;
            const newPayment = await prisma.payment.create({
                data: {
                    customer_id,
                    staff_id,
                    rental_id,
                    amount,
                    payment_date
                }
            });
            res.status(201).json({ data: newPayment });
        } catch (error) {
            res.status(500).json({ error: "Error al crear el pago." });
        }
    }

    async update(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            
            const { id } = req.params;
            const { customer_id, staff_id, rental_id, amount, payment_date } = req.body;
            const updatedPayment = await prisma.payment.update({
                where: { payment_id: Number(id) },
                data: {
                    customer_id,
                    staff_id,
                    rental_id,
                    amount,
                    payment_date
                }
            });
            res.json({ data: updatedPayment });
        } catch (error) {
            res.status(500).json({ error: "Error al actualizar el pago." });
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params;
            await prisma.payment.delete({ where: { payment_id: Number(id) } });
            res.json({ message: "Pago eliminado correctamente." });
        } catch (error) {
            res.status(500).json({ error: "Error al eliminar el pago." });
        }
    }
}

export default new PaymentController();