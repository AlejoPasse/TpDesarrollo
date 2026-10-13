import "reflect-metadata";
import express,{Request,Response} from "express";
import { usuarioRouter } from "./usuario/usuario.routes.js";
import {orm, syncSchema} from "./shared/db/orm.js";
import { RequestContext } from "@mikro-orm/core";

const app = express();
app.use(express.json());

//luego de los middlewares base

app.use((req: Request, res: Response, next) => {
  RequestContext.create(orm.em, next);
})

//antes de las rutas y middlewares del negocio

app.use("/api/usuarios", usuarioRouter);

app.use((__, res) => {
  return res.status(404).json({ message: "Resource Not Found" });
});

await syncSchema(); //never in production, only for development and testing

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});



