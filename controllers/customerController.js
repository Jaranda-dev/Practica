import { prisma } from "../db.js"
import { validationResult } from "express-validator"

class CustomerController {
    constructor() {

    }

    async get(req, res) {
        const customers = await prisma.customer.findMany({
            // include: {
            //     address: true,
            //     store: true,
            //     payment: true,
            //     rental: true
            // }
        })
        res.json({data: customers})
    }

    async show(req, res) {
        const { id } = req.params

        const customer = await prisma.customer.findFirst({
            where: {customer_id: Number(id)}
        })

        res.status(200).json({data: customer})
    }

    async create(req, res) {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { store_id, first_name, last_name, email, address_id } = req.body

        try {
            const newCustomer = await prisma.customer.create({
                data: {
                    store_id,
                    first_name,
                    last_name,
                    email,
                    address_id,
                    create_date: new Date()
                }
            })
            res.status(201).json({data: newCustomer})
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
        const { store_id, first_name, last_name, email, address_id } = req.body
        
        try {
            const newCustomer = await prisma.customer.update({
                where: { customer_id: Number(id) },
                data: {
                    store_id,
                    first_name,
                    last_name,
                    email,
                    address_id
                }
            })
            res.status(200).json({data: newCustomer})
        } catch (error) {
            res.status(500).send(error)
        }
    }

    async delete(req, res) {
        const { id } = req.params
        try {
            await prisma.customer.delete({
                where: { customer_id: Number(id)}
            })
            res.status(200).json({data: "Cliente eliminado"})
        } catch (error) {
            res.status(500).json(error)
        }
        
    }
}

export default new CustomerController()