import {Rutinas} from "./rutina.entity.js";
import {orm} from "../shared/db/orm.js";
import { Request, Response, NextFunction } from "express";
import { ValidRutinaSchema, UpdateRutina } from "./rutina.schema.js";

const em = orm.em;

function sanitizeRutinaRequest(req: Request, res: Response, next: NextFunction) {
    const schema = req.method === 'PATCH' //revisa si es un metodo PATCH para usar el schema de actualizacion o el de creacion
        ? UpdateRutina
        : ValidRutinaSchema;

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
        const routines = await em.find(Rutinas, {})
        res.status(200).json({ message: "Rutinas found", data: routines })
    } catch (error:any) {
        res.status(500).json({ message: error.message })
    }
}   

//findOne
async function findOne(req: Request, res: Response) {
    try{
        const id = parseInt(req.params.id as string);
        const routine = await em.findOne(Rutinas, {id});
        if(!routine){
            return res.status(404).json({ message: "Rutina not found" });
        }
        else{
            res.status(200).json({ message: "Rutina found", data: routine });
        }
    } catch (error:any) {
        res.status(500).json({ message: error.message });
    }
}


//create
async function create(req: Request, res: Response) {
    try {
        const routine =  em.create(Rutinas, req.body.sanitizedInput);
        await em.flush();
        res.status(201).json({ message: "Rutina created", data: routine });
    } catch (error:any) {
        res.status(500).json({ message: error.message });
    }
}

//update
 async function update(req: Request, res: Response) {
    try{
        const id = Number.parseInt(req.params.id as string)
        const routine = em.getReference(Rutinas, id)
        em.assign(routine, req.body.sanitizedInput)
        await em.flush()
        res.status(200).json({ message: "Rutina updated", data: routine });
    } catch (error:any) {
        res.status(500).json({ message: error.message });
    }

}

//delete
async function remove(req: Request, res: Response) {
try{
    const id = Number.parseInt(req.params.id as string)
    const routine = await em.getReference(Rutinas, id)
    em.remove(routine)
    await em.flush()
    res.status(200).json({ message: "Rutina deleted" });
 }catch (error:any) {
    res.status(500).json({ message: error.message });
 }

}


export {sanitizeRutinaRequest, findAll, findOne, remove, create, update};