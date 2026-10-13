import { Request, Response, NextFunction } from "express";
import  {orm} from "../shared/db/orm.js";                           
import {  Usuarios } from "./usuario.entity.js";
import { ValidUsuarioSchema , UpdateUsuario } from './usuario.schema.js';


const em = orm.em;


//request sanitizada ZOD

function sanitizeUserRequest(req: Request, res: Response, next: NextFunction) {
    const schema = req.method === 'PATCH' //revisa si es un metodo PATCH para usar el schema de actualizacion o el de creacion
        ? UpdateUsuario
        : ValidUsuarioSchema;

    const valid = schema.safeParse(req.body);

    if (!valid.success) {
        return res.status(400).json({
            message: 'Error de validación',
            errors: valid.error.issues.map(issue => ({
                campo_error: issue.path.join('.'), //el .join('.') es para que si hay un error en un objeto anidado, se muestre el path completo del campo con error
                mensaje: issue.message
            }))
        });
    }

    req.body.sanitizedInput = valid.data;
    next();
}


//sin zod
/* function sanitizeUserRequest(req: Request, res: Response, next: NextFunction) {
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
 */


//findAll
async function findAll(req: Request, res: Response) {
    try {
        const users = await em.find(Usuarios, {})
        res.status(200).json({ message: "Users found", data: users })
    } catch (error:any) {
        res.status(500).json({ message: error.message })
    }
}   

//findOne
async function findOne(req: Request, res: Response) {
    try{
        const id = parseInt(req.params.id as string);
        const user = await em.findOne(Usuarios, {id});
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
        const user =  em.create(Usuarios, req.body.sanitizedInput);
        await em.flush();
        res.status(201).json({ message: "User created", data: user });
    } catch (error:any) {
        res.status(500).json({ message: error.message });
    }
}

//update
 async function update(req: Request, res: Response) {
    try{
        const id = Number.parseInt(req.params.id as string)
        const user = em.getReference(Usuarios, id)
        em.assign(user, req.body.sanitizedInput)
        await em.flush()
        res.status(200).json({ message: "User updated", data: user });
    } catch (error:any) {
        res.status(500).json({ message: error.message });
    }

}

//delete
async function remove(req: Request, res: Response) {
try{
    const id = Number.parseInt(req.params.id as string)
    const user = await em.getReference(Usuarios, id)
    em.remove(user)
    await em.flush()
    res.status(200).json({ message: "User deleted" });
 }catch (error:any) {
    res.status(500).json({ message: error.message });
 }

}
export { findAll, findOne, create, sanitizeUserRequest, update, remove}; //exporta las funciones que se usan en routes