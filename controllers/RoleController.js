import { prisma } from "../db.js";

class RoleController {
    constructor() {}

    // Método para obtener todos los roles
    async get(req, res) {
        try {
           
            const roles = await prisma.role.findMany();
            res.json({ data: roles });
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener los roles', error });
        }
    }
}

export default new RoleController();
