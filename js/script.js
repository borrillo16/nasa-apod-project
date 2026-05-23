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
        pintarFotos(fotosOriginales);
       
    } catch (error) {
        console.error("Error al conectar con la NASA:", error);
    }
}

function pintarFotos(fotos) {
    const contenedor = document.getElementById("lista-fotos");
    contenedor.innerHTML = "";

    if (!fotos || fotos.length === 0) {
        contenedor.innerHTML = "<p class='error'>No se han encontrado resultados.</p>";
        return;
    }

    fotos.forEach((item) => {
        const tarjeta = document.createElement("article");
        tarjeta.classList.add("tarjeta");

        const mediaHtml =
            item.media_type === "image"
                ? `<img src="${item.hdurl || item.url}" alt="${item.title}">`
                : `<iframe src="${item.url}" title="${item.title}" allowfullscreen></iframe>`;

        const hdLink = item.media_type === "image" ? (item.hdurl || item.url) : item.url;

        tarjeta.innerHTML = `
           
               <div class="contenedor-img">
                    ${mediaHtml}
                </div>

                <div class="info">
                    <h3>${item.title}</h3>

                     <span class="estrella" data-date="${item.date}">★ Favorito</span>

                    <ul>
                        <li><strong>Fecha:</strong> ${item.date}</li>
                        <li><strong>Autor:</strong> ${item.copyright || "NASA / Dominio público"}</li>
                        <li><strong>Tipo:</strong> ${item.media_type.toUpperCase()}</li>
                    </ul>

                    <a href="${hdLink}" target="_blank" class="boton-hd">Descargar Alta Resolución</a>
                    <a class="boton-detalle" href="detalle.html?date=${item.date}">Ver explicación completa</a>
                </div>`;
        contenedor.appendChild(tarjeta);
    });
    
    const estrellas = document.querySelectorAll(".estrella");

    estrellas.forEach(estrella => {
        const fecha = estrella.dataset.date;

        if (esFavorito(fecha)) {
            estrella.classList.add("activo");
        }
    });

    estrellas.forEach(estrella => {
        estrella.addEventListener("click", () => {
            const fecha = estrella.dataset.date;

            alternarFavorito(fecha);

            if (esFavorito(fecha)) {
                estrella.classList.add("activo");
            } else {
                estrella.classList.remove("activo");
            }
           
        });
    });
}

function leerFavoritos() {
    const guardados = localStorage.getItem("favoritos");
    if (!guardados) {
        return [];
    }
    return JSON.parse(guardados);
}

function guardarFavoritos(lista) {
    localStorage.setItem("favoritos", JSON.stringify(lista));
}


function esFavorito(fecha){
    const lista = leerFavoritos();
    return lista.includes(fecha);
}

function alternarFavorito(fecha) {
    let lista = leerFavoritos();
    if (lista.includes(fecha)){
        lista = lista.filter(fechaGuardada => fechaGuardada !== fecha);
    }else{
        lista.push(fecha);
    }
    guardarFavoritos(lista);
}

inputBuscador.addEventListener("input", (event) => {
    const texto = event.target.value.toLowerCase().trim();
    const filtrados = fotosOriginales.filter((foto) => 
        foto.title.toLowerCase().includes(texto)
    );
    pintarFotos(filtrados);
});

btnRecargar.addEventListener("click", () => {
    inputBuscador.value = ""; 
    pintarFotos(fotosOriginales); 
});

btnAleatorio.addEventListener("click", async () => {
    try {
        const respuesta = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&count=6`);
        const datosAleatorios = await respuesta.json();
        pintarFotos(datosAleatorios);
       
    } catch (error) {
        console.error("Error al cargar fotos aleatorias:", error);
    }
});

obtenerFotos();

