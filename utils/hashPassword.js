import bcrypt from 'bcryptjs';

/**
 * Función para generar un hash de la contraseña.
 * @param {string} password La contraseña a encriptar.
 * @returns {string} El hash de la contraseña.
 */
async function hashPassword(password) {
  try {
    const saltRounds = 10; // Número de rondas de sal que se utilizarán para encriptar la contraseña
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    console.error('Error al hacer hash de la contraseña:', error);
    throw new Error('Error al hacer hash de la contraseña');
  }
}

export { hashPassword };
