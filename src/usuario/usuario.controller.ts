import { Request, Response, NextFunction } from "express";
import  {orm} from "../shared/db/orm.js";                           
import {  Usuarios } from "./usuario.entity.js";
import { ValidUsuarioSchema , UpdateUsuario, LoginUsuarioSchema } from './usuario.schema.js';
import argon2 from 'argon2';


const em = orm.em;


// login
async function login(req: Request, res: Response) {
    try {
        const valid = LoginUsuarioSchema.safeParse(req.body);

        if (!valid.success) {
            return res.status(400).json({
                message: "Error de validación",
                errors: valid.error.issues.map(issue => ({
                    campo_error: issue.path.join('.'),
                    mensaje: issue.message
                }))
            });
        }

        const { email, password } = valid.data;

        const user = await em.findOne(Usuarios, { email });

        if (!user) {
            return res.status(401).json({
                message: "Email o contraseña incorrectos"
            });
        }

        const passwordCorrecta = await argon2.verify(user.password, password);

        if (!passwordCorrecta) {
            return res.status(401).json({
                message: "Email o contraseña incorrectos"
            });
        }

        return res.status(200).json({
            message: "Login exitoso",
            data: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        });

    } catch (error: any) {
        console.error("Error en login:", error);

        return res.status(500).json({
            message: error.message
        });
    }}

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


//findAll
async function findAll(req: Request, res: Response) {
    try {
        const users = await em.find(Usuarios, {})
        res.status(200).json({ message: "Users found", data: users.map(user => ({ // quite la contraseña del response para no exponerla
            id: user.id,
            name: user.name,
            email: user.email
        })) })
    } catch (error:any) {
        res.status(500).json({ message: error.message })
    }
}   

//findOne
async function findOne(req: Request, res: Response) {
    console.log("Método:", req.method);
    console.log("URL:", req.originalUrl);
    try{
        const id = parseInt(req.params.id as string);
        const user = await em.findOne(Usuarios, {id});
        if(!user){
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "User found", data: {
            id: user.id, 
            name: user.name, 
            email: user.email // quite la contraseña del response para no exponerla
        } });
    } catch (error:any) {
        res.status(500).json({ message: error.message });
    }
}


//create
async function create(req: Request, res: Response) {
    try {
        const data = req.body.sanitizedInput; // puse el req.body.sanitizedInput en una variable para  facilitar
        data.password = await argon2.hash(data.password); //hash de la contraseña antes de guardarla en la base de datos        
        const user =  em.create(Usuarios, data);
        await em.flush();
        res.status(201).json({ message: "User created", data: {
            id: user.id, 
            name: user.name, 
            email: user.email // quite la contraseña del response para no exponerla
        }
        });
    } catch (error:any) {
        res.status(500).json({ message: error.message });
    }
}

//update
 async function update(req: Request, res: Response) {
    try{
        const id = Number.parseInt(req.params.id as string)
        const data = req.body.sanitizedInput;

        if (data.password !== undefined) {
            data.password = await argon2.hash(data.password);}
        
        const user = em.getReference(Usuarios, id)
        em.assign(user, data)
        await em.flush()
        res.status(200).json({ message: "User updated", data: {
            id: user.id,
            name: user.name,
            email: user.email
        } });
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

export { findAll, findOne, create, sanitizeUserRequest, update, remove, login}; //exporta las funciones que se usan en routes