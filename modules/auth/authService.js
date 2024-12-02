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
  generateToken: (user) => {
    return jwt.sign( { id: user.id, nombre: user.nombre, correo: user.correo, telefono: user.telefono }, process.env.JWT_SECRET, { expiresIn: "1h" }
    );
  }
};

export default authService;
