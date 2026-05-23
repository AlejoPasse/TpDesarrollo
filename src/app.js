let clientes=[];

function crear(cliente) {
    clientes.push(cliente);
}

function listar() {
    return clientes;
}

function actualizar(id,model) {
    const cliente = clientes.find(c=>c.id===id);

    if(cliente) {
        cliente.nombre = model.nombre;
        cliente.email = model.email;
        cliente.contrasena =model.contrasena;
    }

    clientes.update(cliente);
}

function eliminar(id) {
    var cliente = clientes.filter(c => c.id !== id);

    clientes.delete(cliente);
}

module.exports= {
    crear,
    listar,
    actualizar,
    eliminar
};
