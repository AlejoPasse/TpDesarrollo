import z from 'zod';

export const ValidUsuarioSchema = z.object({
  name: z.string().trim().min(1, 'El nombre es obligatorio').max(100),
  email: z.string().trim().email('El email no es válido').max(100),
  password: z
    .string()
    .min(8, { error: 'La contraseña debe tener al menos 8 caracteres' })
    .max(100, { error: 'La contraseña no puede superar los 100 caracteres' })
    .regex(/[A-Z]/, { error: 'La contraseña debe contener al menos una mayúscula' })
    .regex(/[a-z]/, { error: 'La contraseña debe contener al menos una minúscula' })
    .regex(/[0-9]/, { error: 'La contraseña debe contener al menos un número' })
    .regex(/[^A-Za-z0-9]/, { error: 'La contraseña debe contener al menos un símbolo especial' }),
  role: z.enum(['admin', 'cliente']).optional(), // Opcional, por defecto será cliente
  peso: z.number().positive('El peso debe ser un número positivo').optional(),
  altura: z.number().positive('La altura debe ser un número positivo').optional(),
});

export const UpdateUsuario = ValidUsuarioSchema.partial();

export const LoginUsuarioSchema = z.object({
  email: z.string().email('El email no es válido'),
  password: z.string().min(1, 'La contraseña es obligatoria'),
});

export const ForgotPasswordSchema = z.object({
  email: z.string().email('El email no es válido'),
  password: ValidUsuarioSchema.shape.password,
});