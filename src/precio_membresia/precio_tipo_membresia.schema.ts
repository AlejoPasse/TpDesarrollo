import  {z}  from 'zod';

export const ValidPrecioTipoMembresiaSchema = z.object
({
    price: z
        .number()
        .positive('El precio debe ser un número positivo')
        .max(1000000, 'El precio no puede superar 1.000.000'),
});

export const UpdatePrecioTipoMembresia = ValidPrecioTipoMembresiaSchema.partial();