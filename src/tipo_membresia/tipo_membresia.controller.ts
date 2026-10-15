import {TipoMembresias} from "./tipo_membresia.entity.js";
import {orm} from "../shared/db/orm.js";
import { Request, Response, NextFunction } from "express";
import { ValidTipoMembresiaSchema, UpdateTipoMembresia } from "./tipo_membresia.schema.js";

const em = orm.em;

function sanitizeTipoMembresiaRequest(req: Request, res: Response, next: NextFunction) {
    const schema = req.method === 'PATCH' //revisa si es un metodo PATCH para usar el schema de actualizacion o el de creacion
        ? UpdateTipoMembresia
        : ValidTipoMembresiaSchema;

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
        const typeMemberships = await em.find(TipoMembresias, {})
        res.status(200).json({ message: "Type memberships found", data: typeMemberships })
    } catch (error:any) {
        res.status(500).json({ message: error.message })
    }
}   

//findOne
async function findOne(req: Request, res: Response) {
    try{
        const id = parseInt(req.params.id as string);
        const typeMembership = await em.findOne(TipoMembresias, {id});
        if(!typeMembership){
            return res.status(404).json({ message: "Type membership not found" });
        }
        else{
            res.status(200).json({ message: "Type membership found", data: typeMembership });
        }
    } catch (error:any) {
        res.status(500).json({ message: error.message });
    }
}


//create
async function create(req: Request, res: Response) {
    try {
        const typeMembership =  em.create(TipoMembresias, req.body.sanitizedInput);
        await em.flush();
        res.status(201).json({ message: "Type membership created", data: typeMembership });
    } catch (error:any) {
        res.status(500).json({ message: error.message });
    }
}

//update
 async function update(req: Request, res: Response) {
    try{
        const id = Number.parseInt(req.params.id as string)
        const typeMembership = em.getReference(TipoMembresias, id)
        em.assign(typeMembership, req.body.sanitizedInput)
        await em.flush()
        res.status(200).json({ message: "Type membership updated", data: typeMembership });
    } catch (error:any) {
        res.status(500).json({ message: error.message });
    }

}

//delete
async function remove(req: Request, res: Response) {
try{
    const id = Number.parseInt(req.params.id as string)
    const typeMembership = await em.getReference(TipoMembresias, id)
    em.remove(typeMembership)
    await em.flush()
    res.status(200).json({ message: "Type membership deleted" });
 }catch (error:any) {
    res.status(500).json({ message: error.message });
 }

}


export {sanitizeTipoMembresiaRequest, findAll, findOne, remove, create, update};