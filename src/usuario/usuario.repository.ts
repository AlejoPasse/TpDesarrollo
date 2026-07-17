import { Repository } from "../shared/repository";
import { Usuario } from "./usuario.entity.js";
import {pool} from "../shared/conn.mysql.js";
import { ResultSetHeader } from "mysql2";


/*const usuarios = [
    new Usuario("Bruno", "bruno@gmail.com", "password123",1), 
    new Usuario("Axel", "axel@gmail.com", "password456",2),
    new Usuario("Santiago", "santi@gmail.com", "password789",3)
];*/

export class UsuarioRepository implements Repository<Usuario> {
    async findAll(): Promise<Usuario[] | undefined> {
      const [usuario] = await pool.query('SELECT * FROM usuarios')
      return usuario as Usuario[]
    }
  

    async findOne(item: {id: string}): Promise<Usuario | undefined> {
      const id = Number.parseInt(item.id)
      const [usuarios] = await pool.query('SELECT * FROM usuarios WHERE id = ?', [id])
        if ((usuarios as Usuario[]).length === 0) {
          return undefined
        }
      return (usuarios as Usuario[])[0]
    }

    async create(usuarioInput: Usuario): Promise<Usuario | undefined> { 
      const {id, ...usurioRow} = usuarioInput
      const [result] = await pool.query<ResultSetHeader>('INSERT INTO usuarios SET ?', [usurioRow])
      usuarioInput.id = result.insertId
      return usuarioInput
    }

    async update(id: string, usuarioInput: Usuario): Promise<Usuario | undefined> {
      const usuarioId = Number.parseInt(id)
      await pool.query('UPDATE usuarios SET ? WHERE id = ?', [usuarioInput, usuarioId])
      return usuarioInput
    }

    async delete(item: { id: string }): Promise<Usuario | undefined> {
      try {
      const usuariotoDelete = await this.findOne(item)
      const usuarioId = Number.parseInt(item.id)
      await pool.query('DELETE FROM usuarios WHERE id = ?', [usuarioId])
      return usuariotoDelete
      } catch (error:any) {
      throw new Error(`Error deleting user`)
      return undefined
     }
  }
}
