import jwt from 'jsonwebtoken';

const secretKey = process.env.JWT_SECRET_KEY;

// Middleware para verificar la autenticación usando JWT
function authenticateToken(req, res, next) {
  const token = req.header('Authorization')?.split(' ')[1];

  console.log("Token recibido:", token); // Log para ver el token recibido

  if (!token) {
    console.log("No se encontró el token en la solicitud.");
    return res.status(403).json({ message: 'Acceso denegado' });
  }

  const decodedToken = jwt.decode(token); // Decodificar el token para ver sus datos
  console.log("Contenido del token decodificado:", decodedToken); // Ver contenido del token decodificado

  // Si no hay datos en el token, retornamos un error
  if (!decodedToken) {
    return res.status(403).json({ message: 'Token inválido, no contiene datos' });
  }

  // Verificar el JWT y asegurarse de que no esté expirado
  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        console.log("Token expirado:", token);
        return res.status(401).json({ message: 'El token ha expirado, por favor inicia sesión nuevamente' });
      }
      console.log("Token inválido:", token);
      return res.status(403).json({ message: 'Token inválido' });
    }

    console.log("Token verificado correctamente:", user); // Log para ver la verificación exitosa
    req.user = user;
    next(); // Continuar al siguiente middleware o ruta
  });
}

export { authenticateToken };
