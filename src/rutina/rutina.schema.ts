import  {z}  from 'zod';

export const ValidRutinaSchema = z.object
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
    level: z
        .number()
        .min(1, 'El nivel es obligatorio')
        .max(10, 'El nivel no puede superar 10'),
});

export const UpdateRutina = ValidRutinaSchema.partial();