import {Router} from "express";
import {findAll, findOne} from "./usuario.controller.js"; //importar las funciones que faltan desde controller

export const usuarioRoutes = Router();

usuarioRoutes.get("/", findAll);
usuarioRoutes.get("/:id", findOne);
/*usuarioRoutes.post("/", create);
usuarioRoutes.put("/:id", update);
usuarioRoutes.delete("/:id", remove);*/