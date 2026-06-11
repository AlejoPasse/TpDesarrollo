import { Repository } from "../shared/repository";
import { Usuario } from "./usuario.entity.js";


const usuarios = [
    new Usuario("1", "Bruno", "bruno@gmail.com", "password123"), 
    new Usuario("2", "Axel", "axel@gmail.com", "password456"),
    new Usuario("3", "Santiago", "santi@gmail.com", "password789")
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
    //Las proximas dos las puse asi para que compile, pero hay que corregirlas
    update(item: {id: string}): Usuario | undefined {
        return usuarios.find(u => u.id === item.id);
    }
    delete(item: {id: string}): Usuario | undefined {
        return usuarios.find(u => u.id === item.id);
    }
}
