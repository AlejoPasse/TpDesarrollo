import {Ejercicios} from "./ejercicio.entity.js";
import {orm} from "../shared/db/orm.js";
import { Request, Response, NextFunction } from "express";
import { ValidEjercicioSchema, UpdateEjercicio } from "./ejercicio.schema.js";

const em = orm.em;

function sanitizeEjercicioRequest(req: Request, res: Response, next: NextFunction) {
    const schema = req.method === 'PATCH' //revisa si es un metodo PATCH para usar el schema de actualizacion o el de creacion
        ? UpdateEjercicio
        : ValidEjercicioSchema;

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
        const exercises = await em.find(Ejercicios, {})
        res.status(200).json({ message: "Exercises found", data: exercises })
    } catch (error:any) {
        res.status(500).json({ message: error.message })
    }
}   

//findOne
async function findOne(req: Request, res: Response) {
    try{
        const id = parseInt(req.params.id as string);
        const exercise = await em.findOne(Ejercicios, {id});
        if(!exercise){
            return res.status(404).json({ message: "Exercise not found" });
        }
        else{
            res.status(200).json({ message: "Exercise found", data: exercise });
        }
    } catch (error:any) {
        res.status(500).json({ message: error.message });
    }
}


//create
async function create(req: Request, res: Response) {
    try {
        const exercise =  em.create(Ejercicios, req.body.sanitizedInput);
        await em.flush();
        res.status(201).json({ message: "Exercise created", data: exercise });
    } catch (error:any) {
        res.status(500).json({ message: error.message });
    }
}

//update
 async function update(req: Request, res: Response) {
    try{
        const id = Number.parseInt(req.params.id as string)
        const exercise = em.getReference(Ejercicios, id)
        em.assign(exercise, req.body.sanitizedInput)
        await em.flush()
        res.status(200).json({ message: "Exercise updated", data: exercise });
    } catch (error:any) {
        res.status(500).json({ message: error.message });
    }

}

//delete
async function remove(req: Request, res: Response) {
try{
    const id = Number.parseInt(req.params.id as string)
    const exercise = await em.getReference(Ejercicios, id)
    em.remove(exercise)
    await em.flush()
    res.status(200).json({ message: "Exercise deleted" });
 }catch (error:any) {
    res.status(500).json({ message: error.message });
 }

}


export {sanitizeEjercicioRequest, findAll, findOne, remove, create, update};