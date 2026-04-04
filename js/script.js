const API_KEY = "0VeCpkDeaBHszSFV9Zfn10R9kUohNHWITF3RBPnJ";
const API_URL = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&count=30`;



async function obtenerFotos() {
    try{
        const respuesta = await fetch(API_URL);
        const datos = await respuesta.json();
        console.log ("Datos recibidos de la NASA:", datos);
        pintarFotos(datos);
    }catch(error){
        console.error("Error al conectar con la NASA:", error);
    }
   
}

function pintarFotos(fotos) {
    const contenedor = document.getElementById("lista-fotos");
    contenedor.innerHTML = "";
    fotos.forEach((item, index) => {
        contenedor.innerHTML += `
            <article class="tarjeta">
                <img src="${item.url}" alt="${item.title}" style="width: 100px;">
                <h3>${item.title}</h3>
                <p>Fecha: ${item.date}</p>
                <p>Copyright: ${item.copyright || 'Público'}</p>
                
                <a href="detalle.html?date=${item.date}">Ver más detalles</a>
            </article>
            `
    
    });
}
  obtenerFotos();