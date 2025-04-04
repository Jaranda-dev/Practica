import nodemailer from 'nodemailer';
import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from "../db.js";

const secretKey = process.env.JWT_SECRET_KEY;

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: parseInt(process.env.MAIL_PORT),
  secure: false,
  auth: {
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

const sendMail = async (mailOptions) => {
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Correo enviado:', info.response);
  } catch (error) {
    console.log('Error al enviar el correo:', error);
  }
};

const generateVerificationCode = () => crypto.randomBytes(3).toString('hex');

async function sendVerificationCode(userEmail) {
  const code = generateVerificationCode();
  const encryptedCode = await bcrypt.hash(code, 10);

  await prisma.staff.update({
    where: { email: userEmail },
    data: { verificationCode: encryptedCode },
  });

  const mailOptions = {
    from: `${process.env.MAIL_FROM_NAME} <${process.env.MAIL_FROM_ADDRESS}>`,
    to: userEmail,
    subject: 'Código de Verificación',
    text: `Tu código de verificación es: ${code}`,
  };

  await sendMail(mailOptions);
}

async function verifyCode(req, res) {
  const { email, code } = req.body;
  const user = await prisma.staff.findUnique({
    where: { email },
    include: { role: true }
  });

  if (!user || !user.verificationCode) {
    return res.status(400).json({ message: 'Código no encontrado' });
  }

  const isCodeValid = await bcrypt.compare(code, user.verificationCode);

  if (isCodeValid) {
    if (!user.role) {
      return res.status(400).json({ message: 'Rol de usuario no encontrado' });
    }

    await prisma.staff.update({
      where: { email },
      data: { verificationCode: '' },
    });

    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role.name },
      secretKey
      // No se incluye 'expiresIn' para que no tenga expiración
    );

    return res.status(200).json({ token, role: user.role.name });
  } else {
    return res.status(400).json({ message: 'Código incorrecto' });
  }
}

async function login(req, res) {
  const { email, password } = req.body;

  const user = await prisma.staff.findUnique({
    where: { email },
    include: { role: true },
  });

  if (!user) {
    return res.status(400).json({ message: 'Usuario no encontrado' });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: 'Contraseña incorrecta' });
  }

  await sendVerificationCode(user.email);

  return res.status(200).json({ message: 'Código de verificación enviado, por favor ingrésalo.' });
}

async function sendPasswordResetCode(req, res) {
  const { email } = req.body;

  const user = await prisma.staff.findUnique({ where: { email } });

  if (!user) {
    return res.status(400).json({ message: 'Correo no registrado' });
  }

  const resetCode = generateVerificationCode();
  const encryptedResetCode = await bcrypt.hash(resetCode, 10);

  await prisma.staff.update({
    where: { email },
    data: { resetCode: encryptedResetCode },
  });

  const mailOptions = {
    from: `${process.env.MAIL_FROM_NAME} <${process.env.MAIL_FROM_ADDRESS}>`,
    to: email,
    subject: 'Código de Recuperación de Contraseña',
    text: `Tu código de recuperación de contraseña es: ${resetCode}`,
  };

  await sendMail(mailOptions);

  res.status(200).json({ message: 'Código de recuperación enviado por correo' });
}

async function resetPassword(req, res) {
  const { email, newPassword, resetCode } = req.body;

  const user = await prisma.staff.findUnique({ where: { email } });

  if (!user || !user.resetCode) {
    return res.status(400).json({ message: 'Código de recuperación no encontrado o usuario no existe' });
  }

  if (!resetCode) {
    return res.status(400).json({ message: 'Código de recuperación no proporcionado' });
  }

  const isResetCodeValid = await bcrypt.compare(resetCode, user.resetCode);

  if (isResetCodeValid) {
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await prisma.staff.update({
      where: { email },
      data: { password: hashedPassword, resetCode: null },
    });

    res.status(200).json({ message: 'Contraseña restablecida correctamente' });
  } else {
    return res.status(400).json({ message: 'Código de recuperación incorrecto' });
  }
}

export { login, sendVerificationCode, verifyCode, sendPasswordResetCode, resetPassword };
