// 1. Capturar la fecha de la URL
const params = new URLSearchParams(window.location.search);
const fechaSeleccionada = params.get("date");

const API_KEY = "0VeCpkDeaBHszSFV9Zfn10R9kUohNHWITF3RBPnJ"; // Usa la misma que en el otro archivo

async function cargarDetalle() {
    try {
        // Pedimos a la NASA solo la foto de esa fecha
        const respuesta = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&date=${fechaSeleccionada}`);
        const datos = await respuesta.json();
        const autor = datos.copyright ? `Créditos: ${datos.copyright}` : "Créditos: Dominio Público";
        const tipo = datos.media_type === "image" ? "Fotografía Espacial" : "Vídeo/Animación";

        // 2. Pintar los datos
        document.getElementById("titulo-detalle").textContent = datos.title;
        document.getElementById("fecha-detalle").textContent = `Fecha: ${datos.date}`;
        document.getElementById("descripcion-detalle").textContent = datos.explanation;
        document.getElementById("texto-explicacion").innerHTML = `
           <p class="tag-tipo">${tipo}</p>
           <p class="fecha-detalle"> ${datos.date}</p>
           <p class="autor-detalle"> ${autor}</p>
           <hr>
           <p class="descripcion-detalle">${datos.explanation}</p> `;
        
        // Ponemos la imagen o el vídeo
        const contenedorFoto = document.getElementById("foto-grande");
        if(datos.media_type === "image") {
            contenedorFoto.innerHTML = `<img src="${datos.url}" alt="${datos.title}" style="width: 100%; border-radius: 15px;">`;
        } else {
            contenedorFoto.innerHTML = `<iframe src="${datos.url}" frameborder="0" allowfullscreen></iframe>`;
        }

    } catch (error) {
        console.error("Error cargando el detalle:", error);
    }
}

cargarDetalle();