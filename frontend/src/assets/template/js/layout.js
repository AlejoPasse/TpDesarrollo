const paginas = {
  inicio: "../../../../src/pages/login.html",
  alta: "../../../../src/pages/alta.html",
  olvide: "../../../../src/pages/olvide.html",
  menu_cliente: "../../../../src/pages/menu_cliente.html"
};

const contenido = document.getElementById("contenido");

async function renderizar() {
  const pagina = location.hash.slice(1) || "inicio";
  const archivo = paginas[pagina];

  if (!archivo) {
    contenido.textContent = "Página no encontrada.";
    return;
  }

  try {
    const respuesta = await fetch(archivo);

    if (!respuesta.ok) {
      throw new Error(`HTTP ${respuesta.status}`);
    }

    contenido.innerHTML = await respuesta.text();
  } catch (error) {
    contenido.textContent = "No se pudo cargar la página.";
    console.error(error);
  }
}

window.addEventListener("hashchange", renderizar);
renderizar();