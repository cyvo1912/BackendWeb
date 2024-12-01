import express from "express";
import { registerUser, loginUser } from "./authController.js";
import { authenticateToken } from "./authMiddleware.js"; // Middleware de autenticación

const routerAuth = express.Router();

routerAuth.post("/register", registerUser);

routerAuth.post("/login", loginUser);

routerAuth.get("/protected", authenticateToken, (req, res) => {
  res.status(200).json({ message: "Acceso autorizado.", user: req.user });
});

export default routerAuth;
