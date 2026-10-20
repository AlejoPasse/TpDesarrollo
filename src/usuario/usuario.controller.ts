import { Request, Response, NextFunction } from "express";
import { orm } from "../shared/db/orm.js";                                     
import { Usuarios } from "./usuario.entity.js";
import { ValidUsuarioSchema, UpdateUsuario, LoginUsuarioSchema } from './usuario.schema.js';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { wrap } from '@mikro-orm/core';
dotenv.config();

const em = orm.em;

//register
async function register(req: Request, res: Response) {
    try {
        const valid = ValidUsuarioSchema.safeParse(req.body);

        if (!valid.success) {
            return res.status(400).json({
                message: "Fallo al registrar usuario",
                errors: valid.error.issues.map(issue => ({
                    campo_error: issue.path.join('.'),
                    mensaje: issue.message
                }))
            });
        }

        const { name, email, password } = valid.data;

        // Verifica si el usuario ya existe
        const existingUser = await em.findOne(Usuarios, { email });
        if (existingUser) {
            return res.status(400).json({
                message: "El email ya está en uso"
            });
        }

        // Hashea la contraseña
        const hashedPassword = await argon2.hash(password);

        // Crea el nuevo usuario
        const user = em.create(Usuarios, {
            name,
            email,
            password: hashedPassword
        });

        await em.flush();

        return res.status(201).json({
            message: "Usuario registrado exitosamente",
            data: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        });
    } catch (error: any) {
        console.error("Error en register:", error);
        return res.status(500).json({
            message: error.message
        });
    }
}

// login
async function login(req: Request, res: Response) {
    try {
        const valid = LoginUsuarioSchema.safeParse(req.body);

        if (!valid.success) {
            return res.status(400).json({
                message: "Error de validación",
                errors: valid.error.issues.map(issue => ({
                    campo_error: issue.path.join('.'),
                    mensaje: issue.message
                }))
            });
        }

        const { email, password } = valid.data;

        // Busca el usuario en la base de datos por email
        const user = await em.findOne(Usuarios, { email });

        if (!user) {
            return res.status(401).json({
                message: "Email o contraseña incorrectos"
            });
        }

        // Verifica la contraseña usando argon2
        const passwordCorrecta = await argon2.verify(user.password, password);

        if (!passwordCorrecta) {
            return res.status(401).json({
                message: "Email o contraseña incorrectos"
            });
        }

        // Genera un token JWT para el usuario autenticado
        const secret = process.env.JWT_SECRET;
        const refreshSecret = process.env.JWT_REFRESH_SECRET;

        if (!secret || !refreshSecret) {
            return res.status(500).json({
                message: "Error en la configuración del servidor"
            });
        }

        const accessToken = jwt.sign(
            { id: user.id, email: user.email }, 
            secret, { expiresIn: '15m' } 
        );

        const refreshToken = jwt.sign(
            { id: user.id, email: user.email }, 
            refreshSecret, { expiresIn: '7d' }
        );
    
        res.cookie("refreshCookie", refreshToken, {
            httpOnly: true,
          secure: process.env.NODE_ENV === 'production', 
            sameSite: 'lax', 
            maxAge: 7 * 24 * 60 * 60 * 1000 
        });
        // Devuelve el token y la información del usuario
        return res.status(200).json({
            message: "Login exitoso",
            token: accessToken,
            data: {
                id: user.id,
                email: user.email,
            }
        });

    } catch (error: any) {
        console.error("Error en login:", error);

        return res.status(500).json({
            message: error.message
        });
    }
} 

//request sanitizada ZOD
function sanitizeUserRequest(req: Request, res: Response, next: NextFunction) {
    const schema = req.method === 'PATCH' 
        ? UpdateUsuario
        : ValidUsuarioSchema;

    const valid = schema.safeParse(req.body);

    if (!valid.success) {
        return res.status(400).json({
            message: 'Error de validación',
            errors: valid.error.issues.map(issue => ({
                campo_error: issue.path.join('.'),
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
        const users = await em.find(Usuarios, {});
        res.status(200).json({ message: "Users found", data: users.map(user => ({
            id: user.id,
            name: user.name,
            email: user.email
        })) });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
} 

//findOne
async function findOne(req: Request, res: Response) {
    console.log("Método:", req.method);
    console.log("URL:", req.originalUrl);
    try {
        const id = parseInt(req.params.id as string);
        const user = await em.findOne(Usuarios, { id });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "User found", data: {
            id: user.id, 
            name: user.name, 
            email: user.email
        } });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}

//create
async function create(req: Request, res: Response) {
    try {
        const data = req.body.sanitizedInput;       
        data.password = await argon2.hash(data.password);       
        const user = em.create(Usuarios, data);
        await em.flush();
        res.status(201).json({ message: "User created", data: {
            id: user.id, 
            name: user.name, 
            email: user.email
        }});
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}

//update
async function update(req: Request, res: Response) {
    try {
        const id = Number.parseInt(req.params.id as string);
        const data = req.body.sanitizedInput;

        if (data.password !== undefined) {
            data.password = await argon2.hash(data.password);
        }
        
        const user = em.getReference(Usuarios, id);
        em.assign(user, data);
        await em.flush();
        res.status(200).json({ message: "User updated", data: {
            id: user.id,
            name: user.name,
            email: user.email
        } });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}

//delete
async function remove(req: Request, res: Response) {
    try {
        const id = Number.parseInt(req.params.id as string);
        const user = await em.getReference(Usuarios, id);
        em.remove(user);
        await em.flush();
        res.status(200).json({ message: "User deleted" });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}

// Función para actualizar la contraseña directamente por email
async function forgotPassword(req: Request, res: Response) {
    try {
        const { email, password } = req.body;

        // 1. Buscar al usuario por su email usando la entidad correcta 'Usuarios'
        const usuario = await em.findOne(Usuarios, { email });
        if (!usuario) {
            return res.status(404).json({ message: 'No existe un usuario registrado con ese email' });
        }

        // 2. Hashear la nueva contraseña con Argon2
        const hashedPassword = await argon2.hash(password);

        // 3. Actualizar la contraseña en la entidad y guardar en la base de datos
        usuario.password = hashedPassword;
        await em.flush();

        return res.status(200).json({ message: 'Contraseña actualizada con éxito' });
    } catch (error: any) {
        return res.status(500).json({ message: 'Error al actualizar la contraseña', error: error.message });
    }
}

export { findAll, findOne, create, sanitizeUserRequest, update, remove, login, forgotPassword };