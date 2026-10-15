import { Router } from "express";
import { findAll, findOne, remove, create, update, sanitizeRutinaRequest } from "./rutina.controller.js";
  
export const rutinaRouter = Router();

rutinaRouter.get("/", findAll);
rutinaRouter.get("/:id", findOne);
rutinaRouter.post("/", sanitizeRutinaRequest, create);
rutinaRouter.put("/:id", sanitizeRutinaRequest, update);
rutinaRouter.patch("/:id", sanitizeRutinaRequest, update);
rutinaRouter.delete("/:id", remove);