import  z  from 'zod'; 

export const ValidUsuarioSchema = z.object //crea los schemas de validacion para los datos de usuario
({
    name: z
        .string()
        .trim()
        .min(1, 'El nombre es obligatorio')
        .max(100),
    email: z
        .string()
        .trim()
        .email('El email no es válido')
        .max(100),
    password: z
        .string({ error: 'La contraseña debe ser una cadena de texto válida' })
        .min(8, { error: 'La contraseña debe tener al menos 8 caracteres' })
        .max(100, { error: 'La contraseña no puede superar los 100 caracteres' })
        .regex(/[A-Z]/, { error: 'La contraseña debe contener al menos una mayúscula' })
        .regex(/[a-z]/, { error: 'La contraseña debe contener al menos una minúscula' })
        .regex(/[0-9]/, { error: 'La contraseña debe contener al menos un número' })
        .regex(/[^A-Za-z0-9]/, { error: 'La contraseña debe contener al menos un símbolo especial' }),
});

export const UpdateUsuario = ValidUsuarioSchema.partial(); // esquema zod para actualizar parcialmente un usuario, todos los campos son opcionales

export const LoginUsuarioSchema = z.object({
    email: z.string().email("El email no es válido"),
    password: z.string().min(1, "La contraseña es obligatoria") //esquema zod para el login de usuario, solo requiere email y contraseña, ambos obligatorios
});

// Esquema para validar la recuperación / blanqueo de contraseña
export const ForgotPasswordSchema = z.object({
  email: z.string().email('El email no es válido'),
  password: ValidUsuarioSchema.shape.password, // Reutiliza las mismas reglas estrictas de contraseña
});