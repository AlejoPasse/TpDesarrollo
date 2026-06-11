import { Request, Response } from "express";
import { UsuarioRepository } from "./usuario.repository.js";

const repository = new UsuarioRepository();

//Aca falta sanitizar la request 

//

function findAll(req: Request, res: Response) {
    res.json({ data: repository.findAll() });
}
function findOne(req: Request, res: Response) {
    const id = req.params.id as string;
    const user = repository.findOne({id});
    if (user) {
        res.json({ data: user });
    } else {
        res.status(404).json({ message: "User not found" });
    }
}

//Falta agregar la funcion create

//Falta agregar la funcion update

//Falta agregar la funcion delete

export { findAll, findOne }; //exportar las funciones que faltan en routes