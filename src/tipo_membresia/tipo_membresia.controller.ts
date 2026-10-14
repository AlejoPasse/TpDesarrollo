import {TipoMembresias} from "./tipo_membresia.entity.js";
import {orm} from "../shared/db/orm.js";
import { Request, Response, NextFunction } from "express";
import { ValidMembresiaSchema, UpdateMembresia } from "./tipo_membresia.schema.js";

const em = orm.em;

function sanitizeTipoMembresiaRequest(req: Request, res: Response, next: NextFunction) {
    const schema = req.method === 'PATCH' //revisa si es un metodo PATCH para usar el schema de actualizacion o el de creacion
        ? UpdateMembresia
        : ValidMembresiaSchema;

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
        const memberships = await em.find(Membresias, {})
        res.status(200).json({ message: "Memberships found", data: memberships })
    } catch (error:any) {
        res.status(500).json({ message: error.message })
    }
}   

//findOne
async function findOne(req: Request, res: Response) {
    try{
        const id = parseInt(req.params.id as string);
        const membership = await em.findOne(Membresias, {id});
        if(!membership){
            return res.status(404).json({ message: "Membership not found" });
        }
        else{
            res.status(200).json({ message: "Membership found", data: membership });
        }
    } catch (error:any) {
        res.status(500).json({ message: error.message });
    }
}


//create
async function create(req: Request, res: Response) {
    try {
        const membership =  em.create(Membresias, req.body.sanitizedInput);
        await em.flush();
        res.status(201).json({ message: "Membership created", data: membership });
    } catch (error:any) {
        res.status(500).json({ message: error.message });
    }
}

//update
 async function update(req: Request, res: Response) {
    try{
        const id = Number.parseInt(req.params.id as string)
        const membership = em.getReference(Membresias, id)
        em.assign(membership, req.body.sanitizedInput)
        await em.flush()
        res.status(200).json({ message: "Membership updated", data: membership });
    } catch (error:any) {
        res.status(500).json({ message: error.message });
    }

}

//delete
async function remove(req: Request, res: Response) {
try{
    const id = Number.parseInt(req.params.id as string)
    const membership = await em.getReference(Membresias, id)
    em.remove(membership)
    await em.flush()
    res.status(200).json({ message: "Membership deleted" });
 }catch (error:any) {
    res.status(500).json({ message: error.message });
 }

}


export {sanitizeEjercicioRequest, findAll, findOne, remove, create, update};