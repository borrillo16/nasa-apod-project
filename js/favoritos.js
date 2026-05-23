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

async function pintarFavoritos() {
    const contenedorFav = document.getElementById("favoritos");
    contenedorFav.innerHTML = "";

    const favoritos = leerFavoritos();

    if (favoritos.length === 0) {
        contenedorFav.innerHTML = "<p class='error'>No tienes favoritos guardados.</p>";
        return;
    }

    
    for (const fecha of favoritos) {
        const respuesta = await fetch(`https://api.nasa.gov/planetary/apod?api_key=0VeCpkDeaBHszSFV9Zfn10R9kUohNHWITF3RBPnJ&date=${fecha}`);
        const item = await respuesta.json();

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

                <span class="estrella activo" data-date="${item.date}">★ Favorito</span>

                <ul>
                    <li><strong>Fecha:</strong> ${item.date}</li>
                    <li><strong>Autor:</strong> ${item.copyright || "NASA / Dominio público"}</li>
                    <li><strong>Tipo:</strong> ${item.media_type.toUpperCase()}</li>
                </ul>

                <a href="${hdLink}" target="_blank" class="boton-hd">Descargar Alta Resolución</a>
                <a class="boton-detalle" href="detalle.html?date=${item.date}">Ver explicación completa</a>
            </div>
        `;

        contenedorFav.appendChild(tarjeta);

      
        tarjeta.querySelector(".estrella").addEventListener("click", () => {
            alternarFavorito(item.date);
            pintarFavoritos();
        });
    }
}

function eliminarFavorito(fecha) {
    let lista = leerFavoritos();
    lista = lista.filter(f => f !== fecha);
    guardarFavoritos(lista);
}

pintarFavoritos();
