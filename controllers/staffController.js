import { prisma } from "../db.js";
import { validationResult } from "express-validator";
import { hashPassword } from '../utils/hashPassword.js';

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
        // Validar si hay errores en los datos enviados
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
    
        // Obtener los datos del cuerpo de la solicitud
        const { first_name, last_name, address_id, email, store_id, username, password, active, roleId } = req.body;
    
        // Hashear la contraseña antes de guardarla
        const hashedPassword = await hashPassword(password);
    
        // Crear un nuevo registro en la base de datos para el staff
        const newStaff = await prisma.staff.create({
          data: {
            first_name,
            last_name,
            address_id,
            email,
            store_id,
            username,
            password: hashedPassword, 
            active,
            roleId,
          }
        });
    
       
        res.status(201).json({ data: newStaff });
      } catch (error) {
        console.error('Error al crear el staff:', error); // Log del error en el servidor para depuración
    
        // Determinar el tipo de error y devolver el mensaje adecuado
        if (error instanceof prisma.PrismaClientValidationError) {
          return res.status(400).json({ error: 'Error de validación en la base de datos', details: error.message });
        }
    
        // Devolver un error genérico si no es un error conocido
        return res.status(500).json({ error: 'Error al crear el staff', details: error.message });
      }
    }
    

    async update(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            
            const { id } = req.params;
            const { first_name, last_name, address_id, email, store_id, username, password, active ,roleId} = req.body;
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
                    active,
                    roleId
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
            await prisma.store.updateMany({
                where: { manager_staff_id: Number(id) },
                data: { manager_staff_id: null }
            });
            await prisma.payment.deleteMany({ where: { staff_id: Number(id) } });
            await prisma.rental.deleteMany({ where: { staff_id: Number(id) } });
            await prisma.staff.delete({ where: { staff_id: Number(id) } });
            res.json({ message: "Staff eliminado correctamente." });
        } catch (error) {
            res.status(500).json({ error: error.message});
        }
    }
}

export default new StaffController();
