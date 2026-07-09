import { Repository } from "../shared/repository";
import { Usuario } from "./usuario.entity.js";


const usuarios = [
    new Usuario("1-1-1-1-1", "Bruno", "bruno@gmail.com", "password123"), 
    new Usuario("2-2-2-2-2", "Axel", "axel@gmail.com", "password456"),
    new Usuario("3-3-3-3-3", "Santiago", "santi@gmail.com", "password789")
];

export class UsuarioRepository implements Repository<Usuario> {
    findAll(): Usuario[] | undefined {
        return usuarios;
    }
    findOne(item: {id: string}): Usuario | undefined {
        return usuarios.find(user => user.id === item.id);
    }
    create(item: Usuario): Usuario | undefined { 
        usuarios.push(item);
        return item;
    }

   update(item: Usuario): Usuario | undefined {
    const userIdx = usuarios.findIndex((user) => user.id === item.id)

    if (userIdx !== -1) {
      usuarios[userIdx] = { ...usuarios[userIdx], ...item }
    }
    return usuarios[userIdx]
  }

    delete(item: { id: string }): Usuario | undefined {
    const userIdx = usuarios.findIndex((user) => user.id === item.id)

    if (userIdx !== -1) {
      const deletedUsers = usuarios[userIdx]
      usuarios.splice(userIdx, 1)
      return deletedUsers
    }
  }
}
