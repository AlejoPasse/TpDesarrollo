import {PrecioTipoMembresias} from "./precio_tipo_membresia.entity.js";
import {orm} from "../shared/db/orm.js";
import { Request, Response, NextFunction } from "express";
import { ValidPrecioTipoMembresiaSchema, UpdatePrecioTipoMembresia } from "./precio_tipo_membresia.schema.js";

const em = orm.em;

function sanitizePrecioTipoMembresiaRequest(req: Request, res: Response, next: NextFunction) {
    const schema = req.method === 'PATCH' //revisa si es un metodo PATCH para usar el schema de actualizacion o el de creacion
        ? UpdatePrecioTipoMembresia
        : ValidPrecioTipoMembresiaSchema;

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
        const priceTypeMemberships = await em.find(PrecioTipoMembresias, {})
        res.status(200).json({ message: "Price type memberships found", data: priceTypeMemberships })
    } catch (error:any) {
        res.status(500).json({ message: error.message })
    }
}   

//findOne
async function findOne(req: Request, res: Response) {
    try{
        const date_start_price = new Date(req.params.date as string);
        const priceTypeMembership = await em.findOne(PrecioTipoMembresias, {date_start_price});
        if(!priceTypeMembership){
            return res.status(404).json({ message: "Price type membership not found" });
        }
        else{
            res.status(200).json({ message: "Price type membership found", data: priceTypeMembership });
        }
    } catch (error:any) {
        res.status(500).json({ message: error.message });
    }
}


//create
async function create(req: Request, res: Response) {
    try {
        const priceTypeMembership =  em.create(PrecioTipoMembresias, req.body.sanitizedInput);
        await em.flush();
        res.status(201).json({ message: "Price type membership created", data: priceTypeMembership });
    } catch (error:any) {
        res.status(500).json({ message: error.message });
    }
}


export {sanitizePrecioTipoMembresiaRequest, findAll, findOne, create};