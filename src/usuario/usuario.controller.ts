import { Request, Response, NextFunction } from "express";
import  {orm} from "../shared/db/orm.js";                           
import {  Usuario } from "./usuario.entity.js";

const em = orm.em;


//request sanitizada (seba)
function sanitizeUserRequest(req: Request, res: Response, next: NextFunction) {
    req.body.sanitizedInput = { 
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    };
    
    Object.keys(req.body.sanitizedInput).forEach((key) => {
        if (req.body.sanitizedInput[key] === undefined) {
            delete req.body.sanitizedInput[key]
        }
        })
    next()
}


//findAll
async function findAll(req: Request, res: Response) {
    try {
        const users = await em.find(Usuario, {})
        res.status(200).json({ message: "Users found", data: users })
    } catch (error:any) {
        res.status(500).json({ message: error.message })
    }
}   

//findOne
async function findOne(req: Request, res: Response) {
    try{
        const id = parseInt(req.params.id as string);
        const user = await em.findOne(Usuario, {id});
        if(!user){
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "User found", data: user });
    } catch (error:any) {
        res.status(500).json({ message: error.message });
    }
}


//create
async function create(req: Request, res: Response) {
    try {
        const user =  em.create(Usuario, req.body.sanitizedInput);
        await em.flush();
        res.status(201).json({ message: "User created", data: user });
    } catch (error:any) {
        res.status(500).json({ message: error.message });
    }
}

//Falta agregar la funcion update
 async function update(req: Request, res: Response) {
    try{
        const id = Number.parseInt(req.params.id as string)
        const user = em.getReference(Usuario, id)
        em.assign(user, req.body.sanitizedInput)
        await em.flush()
        res.status(200).json({ message: "User updated", data: user });
    } catch (error:any) {
        res.status(500).json({ message: error.message });
    }

}

//Falta agregar la funcion delete
async function remove(req: Request, res: Response) {
try{
    const id = Number.parseInt(req.params.id as string)
    const user = await em.getReference(Usuario, id)
    em.remove(user)
    await em.flush()
    res.status(200).json({ message: "User deleted" });
 }catch (error:any) {
    res.status(500).json({ message: error.message });
 }

}
export { findAll, findOne, create, sanitizeUserRequest, update, remove}; //exportar las funciones que faltan en routes