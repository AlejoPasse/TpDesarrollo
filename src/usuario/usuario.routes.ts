import {Router} from "express";
import {findAll, findOne, remove, create, update, sanitizeUserRequest} from "./usuario.controller.js"; 

export const usuarioRouter = Router();

usuarioRouter.get("/", findAll);
usuarioRouter.get("/:id", findOne);
usuarioRouter.post("/",sanitizeUserRequest, create);
usuarioRouter.put("/:id", sanitizeUserRequest, update);
usuarioRouter.patch("/:id", sanitizeUserRequest, update);
usuarioRouter.delete("/:id", remove);