import { Router } from "express";
import { findAll, findOne, remove, create, update, sanitizeEjercicioRequest } from "./membresia.controller.js";

export const ejercicioRouter = Router();

ejercicioRouter.get("/", findAll);
ejercicioRouter.get("/:id", findOne);
ejercicioRouter.post("/", sanitizeEjercicioRequest, create);
ejercicioRouter.put("/:id", sanitizeEjercicioRequest, update);
ejercicioRouter.patch("/:id", sanitizeEjercicioRequest, update);
ejercicioRouter.delete("/:id", remove);