let clientes=[];

function crear(cliente) {
    clientes.push(cliente);
}

function listar(){
    return clientes;
}
function actualizar(id,nuevoNombre){
    const cliente=clientes.find(c=>c.id===id);

    if(cliente){
        cliente.nombre=nuevoNombre;
    }
}

function eliminar(id){
    clientes=clientes.filter(c=>c.id!==id);
}

module.exports={
    crear,
    listar,
    actualizar,
    eliminar
};
