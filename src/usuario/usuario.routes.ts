import { Router } from "express";
import { 
    findAll, 
    findOne, 
    remove, 
    create, 
    update, 
    sanitizeUserRequest, 
    login, 
    forgotPassword,
    updateClientePerfil 
} from "./usuario.controller.js"; 
import { verificarToken } from "../middleware/auth.middleware.js";

export const usuarioRouter = Router();

usuarioRouter.post("/login", login); 
usuarioRouter.post("/forgot-password", forgotPassword); 

// Ruta protegida para que el cliente actualice su peso y altura
usuarioRouter.put("/cliente/perfil", verificarToken, sanitizeUserRequest, updateClientePerfil);

usuarioRouter.get("/", findAll);
usuarioRouter.get("/:id", findOne);
usuarioRouter.post("/", sanitizeUserRequest, create);
usuarioRouter.put("/:id", sanitizeUserRequest, update);
usuarioRouter.patch("/:id", sanitizeUserRequest, update);
usuarioRouter.delete("/:id", remove);