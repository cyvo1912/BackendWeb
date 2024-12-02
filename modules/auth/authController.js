import { Usuario } from "../../models/Usuario.js";
import authService from "./authService.js";

export const registerUser = async (req, res) => {
  const { nombre, correo, contraseña, telefono } = req.body;

  try {
    const existingUser = await Usuario.findOne({ where: { correo } });
    if (existingUser) {
      return res.status(400).json({ error: "El correo ya está registrado." });
    }

    const hashedPassword = await authService.hashPassword(contraseña);

    const newUser = await Usuario.create({
      nombre,
      correo,
      contraseña: hashedPassword,
      telefono,
      admi: false, 
    });

    const token = authService.generateToken(newUser);

    res.status(201).json({
      message: "Usuario registrado exitosamente.",
      Usuario: { id: newUser.id, nombre: newUser.nombre, correo: newUser.correo },
      token,
    });
  } catch (error) {
    console.error('Error al registrar el usuario:', error);
    res.status(500).json({ error: "Error al registrar el usuario."});
  }
};

export const loginUser = async (req, res) => {
  const { correo, contraseña } = req.body;

  try {
    const user = await Usuario.findOne({ where: { correo } });
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado." });
    }

    const isPasswordValid = await authService.comparePassword(contraseña, user.contraseña);
    if (!isPasswordValid) {
      return res.status(400).json({ error: "Contraseña incorrecta." });
    }

    const token = authService.generateToken(user);

    res.status(200).json({
      message: "Inicio de sesión exitoso.",
      user: { id: user.id, nombre: user.nombre, correo: user.correo },
      token,
    });
  } catch (error) {
    res.status(500).json({ error: "Error al iniciar sesión." });
  }
};


