
const params = new URLSearchParams(window.location.search);
const fechaSeleccionada = params.get("date");

const API_KEY = "0VeCpkDeaBHszSFV9Zfn10R9kUohNHWITF3RBPnJ"; 

async function cargarDetalle() {
    try {
   
        const respuesta = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&date=${fechaSeleccionada}`);
        const datos = await respuesta.json();
        const autor = datos.copyright ? `Créditos: ${datos.copyright}` : "Créditos: Dominio Público";
        const tipo = datos.media_type === "image" ? "Fotografía Espacial" : "Vídeo/Animación";

        
      
        document.getElementById("texto-explicacion").innerHTML = `
           <p class="tag-tipo">${tipo}</p>
           <p class="fecha-detalle"> ${datos.date}</p>
           <p class="autor-detalle"> ${autor}</p>
           <hr>
           <p class="descripcion-detalle">${datos.explanation}</p> `;
        
      
        const contenedorFoto = document.getElementById("foto-grande");
        if(datos.media_type === "image") {
            contenedorFoto.innerHTML = `<img src="${datos.url}" alt="${datos.title}">`;
        } else {
            contenedorFoto.innerHTML = `<iframe src="${datos.url}" frameborder="0" allowfullscreen></iframe>`;
        }

    } catch (error) {
        console.error("Error cargando el detalle:", error);
    }
}

cargarDetalle();