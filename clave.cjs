const crypto = require('crypto');

// Generar una clave secreta de 256 bits (32 caracteres)
const secretKey = crypto.randomBytes(32).toString('hex');
console.log(secretKey);