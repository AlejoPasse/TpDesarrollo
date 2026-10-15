import { Router } from "express";
import { findAll, findOne, create, sanitizePrecioTipoMembresiaRequest } from "./precio_tipo_membresia.controller.js";

export const precioTipoMembresiaRouter = Router();

precioTipoMembresiaRouter.get("/", findAll);
precioTipoMembresiaRouter.get("/:date_start_price", findOne);
precioTipoMembresiaRouter.post("/", sanitizePrecioTipoMembresiaRequest, create);