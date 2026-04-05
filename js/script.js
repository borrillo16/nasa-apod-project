const API_KEY = "0VeCpkDeaBHszSFV9Zfn10R9kUohNHWITF3RBPnJ";
const API_URL = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&count=30`;
const btnRecargar = document.getElementById("boton-recargar");
const inputBuscador = document.getElementById("buscador");
const btnAleatorio = document.getElementById("btn-aleatorio");

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
                        
                    </ul>
                    <a href="${item.hdurl}" target="_blank" class="boton-hd">Descargar Alta Resolución</a>
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

btnRecargar.addEventListener("click", () => {
    inputBuscador.value = "";  // Borramos el texto que escribió el usuario
    pintarFotos(fotosOriginales); // Volvemos a mostrar las 30 fotos
});



btnAleatorio.addEventListener("click", async () => {
    // Cambiamos el endpoint para pedir 3 fotos al azar
    const respuesta = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&count=6`);
    const datosAleatorios = await respuesta.json();
    
    // Usamos tu función de siempre para pintarlas
    pintarFotos(datosAleatorios);
    
    // Actualizamos nuestra "caja fuerte" para que el buscador también funcione con estas nuevas fotos
    fotosOriginales = datosAleatorios;
});

obtenerFotos();