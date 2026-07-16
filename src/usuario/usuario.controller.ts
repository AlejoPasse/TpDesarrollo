import { Request, Response, NextFunction } from "express";
import { UsuarioRepository } from "./usuario.repository.js";
import { Usuario } from "./usuario.entity.js";

const repository = new UsuarioRepository();


//request sanitizada (seba)
function sanitizeUserRequest(req: Request, res: Response, next: NextFunction) {
    req.body.sanitizedInput = { 
        id: req.body.id || crypto.randomUUID(),
        nombre: req.body.nombre,
        email: req.body.email,
        password: req.body.password
    };
    
    Object.keys(req.body.sanitizedInput).forEach((key) => {
        if (req.body.sanitizedInput[key] === undefined) {
            delete req.body.sanitizedInput[key];
        }
        })
    next()
}


//findAll
function findAll(req: Request, res: Response) {
    res.json({ data: repository.findAll() });
}

//findOne
function findOne(req: Request, res: Response) {
    const id = req.params.id as string;
    const user = repository.findOne({id});
    if (user) {
        res.json({ data: user });
    } else {
        res.status(404).json({ message: "User not found" });
    }
}

//create
function create(req: Request, res: Response) {
    const input = req.body.sanitizedInput 

    const userInput = new Usuario(
        input.id,
        input.nombre,
        input.email,
        input.password
    );

    const user = repository.create(userInput)
    return res.status(201).json({ message: "User created",data: user })
}

//Falta agregar la funcion update
function update(req: Request, res: Response) {
    req.body.sanitizedInput.id = req.params.id
    const user = repository.update(req.body.sanitizedInput)

    if(!user) {
        return res.status(404).send({ message: "User not found" });
    }

    return res.status(200).send({ message: "User updated", data: user });
}

//Falta agregar la funcion delete
function remove(req: Request, res: Response) {
    const id = req.params.id as string; 
    const user = repository.delete({id});

    if (!user) {
        res.status(404).send({ message: "User not found" });
    } else {
        res.status(200).send({ message: "User deleted"});
    }
}

export { findAll, findOne, create, sanitizeUserRequest, update, remove}; //exportar las funciones que faltan en routes