import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "secreto_super_seguro";

export const verificarToken = (req: any, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Extrae el token del formato "Bearer TOKEN"

  if (!token) {
    return res.status(401).json({ message: "Acceso denegado. Token no proporcionado." });
  }

  try {
    const verified = jwt.verify(token, JWT_SECRET);
    req.user = verified; // Guarda los datos del usuario decodificado (id, role, email) en req.user
    next();
  } catch (error) {
    return res.status(403).json({ message: "Token inválido o expirado." });
  }
};