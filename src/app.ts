
import express,{Request,Response} from "express";
import { usuarioRoutes } from "./usuario/usuario.routes.js";


const app = express();
app.use(express.json());


app.use("/api/usuarios", usuarioRoutes);


app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

app.use((req, res, next) => {
  return res.status(404).json({ message: "Resource Not Found" });
});