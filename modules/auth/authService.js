// authService.js
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const authService = {
  hashPassword: async (password) => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  },
  comparePassword: async (inputPassword, storedPassword) => {
    return bcrypt.compare(inputPassword, storedPassword);
  },
  generateToken: (Usuario) => {
    return jwt.sign(
      { id: Usuario.id, nombre: Usuario.nombre, correo: Usuario.correo },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
  }
};

export default authService;
