import { Router } from "express";
import { 
    findAll, 
    findOne, 
    remove, 
    create, 
    update, 
    sanitizeUserRequest, 
    login, 
    forgotPassword 
} from "./usuario.controller.js"; 

export const usuarioRouter = Router();

usuarioRouter.post("/login", login); //ruta para el login de usuario, requiere email y contraseña, ambos obligatorios
usuarioRouter.post("/forgot-password", forgotPassword); // <--- ¡Colocada aquí antes de /:id para evitar conflictos!

usuarioRouter.get("/", findAll);
usuarioRouter.get("/:id", findOne);
usuarioRouter.post("/", sanitizeUserRequest, create);
usuarioRouter.put("/:id", sanitizeUserRequest, update);
usuarioRouter.patch("/:id", sanitizeUserRequest, update);
usuarioRouter.delete("/:id", remove);