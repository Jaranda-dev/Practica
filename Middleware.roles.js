import { prisma } from "./db.js";

const roleMiddleware = (rolesAllowed) => {
  return async (req, res, next) => {
    // Suponemos que el token ya fue validado previamente en otro middleware
    const user = req.user;  // Usamos `req.user`, que debería haber sido agregado por el middleware de autenticación

    console.log("Usuario recibido:", user);

    if (!user) {
      console.log("Acceso denegado, no se encontró el usuario.");
      return res.status(403).json({ message: "Acceso denegado, no se encontró el usuario" });
    }

    // Verificar si el rol del usuario está en la lista de roles permitidos
    console.log("Roles permitidos:", rolesAllowed);
    console.log("Rol del usuario:", user.role);

    if (!rolesAllowed.includes(user.role)) {
      console.log("Acceso denegado, rol insuficiente.");
      return res.status(403).json({ message: "Acceso denegado, rol insuficiente" });
    }

    console.log("Acceso permitido, rol válido.");
    next();  // Si todo es correcto, pasar al siguiente middleware o ruta
  };
};

export { roleMiddleware };
