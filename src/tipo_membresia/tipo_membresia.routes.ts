import { Router } from "express";
import { findAll, findOne, remove, create, update, sanitizeTipoMembresiaRequest } from "./tipo_membresia.controller.js";

export const tipoMembresiaRouter = Router();

tipoMembresiaRouter.get("/", findAll);
tipoMembresiaRouter.get("/:id", findOne);
tipoMembresiaRouter.post("/", sanitizeTipoMembresiaRequest, create);
tipoMembresiaRouter.put("/:id", sanitizeTipoMembresiaRequest, update);
tipoMembresiaRouter.patch("/:id", sanitizeTipoMembresiaRequest, update);
tipoMembresiaRouter.delete("/:id", remove);