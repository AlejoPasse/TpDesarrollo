/* import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => { 
    
    const token = req.cookies.access_token; // Obtiene el token de la cookie
        if (!token) {
            return res.status(403).json({ message: "Acceso denegado" });
        }

    const JWT_SECRET = process.env.JWT_SECRET;

    if (!JWT_SECRET) {
        return res.status(401).json({ message: "Token inválido" });
    }

    try {
        const data = jwt.verify(token, JWT_SECRET) as { id: number; email: string };
    } catch (error) {
        return res.status(401).json({ message: "Token inválido" });
    }
    next();
} */