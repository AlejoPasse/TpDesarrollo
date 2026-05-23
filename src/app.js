let usuarios=[];

function crear(usuario) {
    usuario.push(usuario);
}

function listar() {
    return usuarios;
}

function actualizar(id,model) {
    let usuario = usuarios.find(c => c.id === id);

    if(usuario) {
        usuario.nombre = model.nombre;
        usuario.email = model.email;
        usuario.contrasena = model.contrasena;
    }

    usuarios.update(usuario);
}

function eliminar(id) {
    let usuario = usuarios.filter(c => c.id !== id);

    usuarios.delete(usuario);
}

module.exports= {
    crear,
    listar,
    actualizar,
    eliminar
};
