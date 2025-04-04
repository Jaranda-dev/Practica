import express from 'express';
import { login, sendVerificationCode, verifyCode, sendPasswordResetCode, resetPassword } from '../controllers/authController.js';
import { authenticateToken } from '../authenticateToken.js';
import { roleMiddleware } from '../Middleware.roles.js';

const router = express.Router();

// Ruta para login (autenticación JWT) - No requiere middleware ya que es el primer punto de acceso
router.post('/login', login);

// Ruta para verificar el código (2FA) 
router.post('/verify', verifyCode);

// Ruta para enviar el código de recuperación de contraseña - Solo usuarios autenticados pueden solicitarlo
router.post('/password-reset', authenticateToken, sendPasswordResetCode);

// Ruta para restablecer la contraseña - Solo usuarios autenticados pueden restablecer la contraseña
router.post('/reset-password', authenticateToken, resetPassword);

export default router;
