import { Request, Response } from "express";
import { orm } from "../shared/db/orm.js";
import { Usuarios } from "./usuario.entity.js";
import argon2 from "argon2";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "secreto_super_seguro";

export async function findAll(req: Request, res: Response) {
  try {
    const em = orm.em.fork();
    const usuarios = await em.find(Usuarios, {});
    return res.status(200).json({ message: "Usuarios encontrados", data: usuarios });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
}

export async function findOne(req: Request, res: Response) {
  try {
    const em = orm.em.fork();
    const id = Number.parseInt(String(req.params.id));
    const usuario = await em.findOne(Usuarios, { id } as any);
    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    return res.status(200).json({ message: "Usuario encontrado", data: usuario });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
}

export async function add(req: Request, res: Response) {
  try {
    const em = orm.em.fork();
    
    const existingUser = await em.findOne(Usuarios, { email: req.body.email });
    if (existingUser) {
      return res.status(400).json({ message: "El correo electrónico ya está registrado" });
    }

    const hashedPassword = await argon2.hash(req.body.password);

    const usuario = em.create(Usuarios, {
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      role: req.body.role || "cliente", 
      peso: req.body.peso || 70.0,
      altura: req.body.altura || 1.75,
    });

    em.persist(usuario);
    await em.flush();

    return res.status(201).json({ message: "Usuario creado con éxito", data: usuario });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
}

export const create = add;

export async function update(req: Request, res: Response) {
  try {
    const em = orm.em.fork();
    const id = Number.parseInt(String(req.params.id));
    const usuario = await em.findOne(Usuarios, { id } as any);

    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    if (req.body.password) {
      req.body.password = await argon2.hash(req.body.password);
    }

    em.assign(usuario, req.body);
    await em.flush();

    return res.status(200).json({ message: "Usuario actualizado con éxito", data: usuario });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
}

export async function remove(req: Request, res: Response) {
  try {
    const em = orm.em.fork();
    const id = Number.parseInt(String(req.params.id));
    const usuario = await em.findOne(Usuarios, { id } as any);

    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    em.remove(usuario);
    await em.flush();

    return res.status(200).json({ message: "Usuario eliminado con éxito" });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
}

export async function login(req: Request, res: Response) {
  try {
    const em = orm.em.fork();
    const { email, password } = req.body;

    const usuario = await em.findOne(Usuarios, { email });
    if (!usuario) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    const validPassword = await argon2.verify(usuario.password, password);
    if (!validPassword) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    const userId = (usuario as any).id;

    const token = jwt.sign(
      { id: userId, email: usuario.email, role: usuario.role },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.status(200).json({
      message: "Login exitoso",
      token,
      user: {
        id: userId,
        name: usuario.name,
        email: usuario.email,
        role: usuario.role,
        peso: (usuario as any).peso,
        altura: (usuario as any).altura,
      },
    });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
}

export async function forgotPassword(req: Request, res: Response) {
  try {
    const em = orm.em.fork();
    const { email, password } = req.body;

    const usuario = await em.findOne(Usuarios, { email });
    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado con ese correo" });
    }

    const hashedPassword = await argon2.hash(password);
    usuario.password = hashedPassword;

    await em.flush();

    return res.status(200).json({ message: "Contraseña actualizada con éxito" });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
}

export async function updateClientePerfil(req: any, res: Response) {
  try {
    const em = orm.em.fork();
    const userId = Number(req.user?.id || req.user?.userId);
    
    if (!userId || isNaN(userId)) {
      return res.status(401).json({ message: "No autorizado: ID de usuario no válido" });
    }

    const usuario = await em.findOne(Usuarios, { id: userId } as any);
    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    let { peso, altura } = req.body;

    if (peso !== undefined) {
      peso = Number(String(peso).replace(',', '.'));
    }
    if (altura !== undefined) {
      altura = Number(String(altura).replace(',', '.'));
    }

    em.assign(usuario, { 
      peso: !isNaN(peso) ? peso : (usuario as any).peso, 
      altura: !isNaN(altura) ? altura : (usuario as any).altura 
    } as any);

    await em.flush();

    return res.status(200).json({
      message: "Perfil actualizado con éxito",
      user: {
        id: userId,
        name: (usuario as any).name,
        email: (usuario as any).email,
        role: (usuario as any).role,
        peso: (usuario as any).peso,
        altura: (usuario as any).altura,
      },
    });
  } catch (error: any) {
    console.error("ERROR DETALLADO EN ACTUALIZAR PERFIL:", error);
    return res.status(500).json({ message: error.message || "Error interno del servidor" });
  }
}

export async function sanitizeUserRequest(req: Request, res: Response, next: Function) {
  next();
}

export const usuarioController = {
  findAll,
  findOne,
  add,
  create,
  update,
  remove,
  login,
  forgotPassword,
  sanitizeUserRequest,
  updateClientePerfil,
};