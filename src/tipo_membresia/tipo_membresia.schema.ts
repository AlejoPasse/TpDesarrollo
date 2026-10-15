import  {z}  from 'zod';

export const ValidTipoMembresiaSchema = z.object
({
    name: z
        .string()
        .trim()
        .min(1, 'El nombre es obligatorio')
        .max(100),
    description: z
        .string()
        .trim()
        .max(200, 'La descripción no puede superar los 200 caracteres')
        .min(1, 'La descripción es obligatoria'),
});

export const UpdateTipoMembresia = ValidTipoMembresiaSchema.partial();