import  {z}  from 'zod';

export const ValidEjercicioSchema = z.object
({
    name: z
        .string()
        .trim()
        .min(1, 'El nombre es obligatorio')
        .max(100),
    description: z
        .string()
        .trim()
        .min(1, 'La descripción es obligatoria')
        .max(200),
    nota: z
        .string()
        .trim()
        .max(200, 'La nota no puede superar los 200 caracteres'),
});

export const UpdateEjercicio = ValidEjercicioSchema.partial();