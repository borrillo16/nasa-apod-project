const API_KEY = "0VeCpkDeaBHszSFV9Zfn10R9kUohNHWITF3RBPnJ";
const API_URL = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&count=30`;

let fotosOriginales = [];

async function obtenerFotos() {
    try {
        const respuesta = await fetch(API_URL);
        const datos = await respuesta.json();
        fotosOriginales = datos;
        console.log("Datos recibidos de la NASA:", datos);
        pintarFotos(fotosOriginales);
    } catch (error) {
        console.error("Error al conectar con la NASA:", error);
    }

}

function pintarFotos(fotos) {
    const contenedor = document.getElementById("lista-fotos");
    contenedor.innerHTML = "";

      if (fotos.length === 0) {
    contenedor.innerHTML = "<p class='error'>No se han encontrado resultados.</p>";
  }

    fotos.forEach((item) => {
        contenedor.innerHTML += `
            <article class="tarjeta">
                <img src="${item.url}" alt="${item.title}">
                <div class="info">
                    <h3>${item.title}</h3>
                    <ul>
                        <li><strong>Fecha:</strong> ${item.date}</li>
                        <li><strong>Autor:</strong> ${item.copyright || "NASA / Dominio público"}</li>
                        <li><strong>Tipo:</strong> ${item.media_type.toUpperCase()}</li>
                        <li><a href="${item.hdurl}" target="_blank">Descargar en HD"</a></li>
                    </ul>
                    <a class="boton-detalle" href="detalle.html?date=${item.date}">Ver explicación completa</a>
                </div>

            </article> `

    });
}

buscador.addEventListener("input", (event) => {
    const texto = event.target.value.toLowerCase().trim();
    const filtrados = fotosOriginales.filter((fotos) => 
        fotos.title.toLowerCase().includes(texto)
    );
    pintarFotos(filtrados);
})

obtenerFotos();