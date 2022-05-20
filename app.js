let url = "https://pokeapi.co/api/v2/pokemon/";

// ----------------------------------------------------------- Funcion de Pagina
function onLoad(url) {
    let app = document.querySelector(".app");
    let previous = document.querySelector(".previous")
    let next = document.querySelector(".next")
    app.innerHTML = "";
    fetch(url)
        .then(data => data.json())
        .then(data => {

            let characters = data.results;
            characters.forEach(character => {
                let consumeImage = fetch(character.url)
                .then(data => data.json())
                .then(data => {
                    let images = data.sprites;
                    let weight = data.weight;
                    let height = data.height;
                    app.innerHTML += render(character.name, images.other.home.front_default, weight, height);
                });
            });
        });
}

// -----------------------------------------------------------Funcion Búscar
function search(url) {
    fetch(url)
    .then(data => data.json())
    .then(data => {
        let name = data.forms[0].name;
        let images = data.sprites;
        let weight = data.weight;
        let height = data.height;
        let app = document.querySelector(".app");
        app.innerHTML = "";
        app.innerHTML += render(name, images.other.home.front_default, weight, height);
    })
}

// ----------------------------------------------------------- Funcion Pintar Resultados
function render (characterName, characterImage, characterWeight, characterHeight) {
    return `
        <div class="col my-4 mx-auto">
            <div class="card h-100 border border-primary">
                <img src="${characterImage}" class="card-img-top" alt="...">
                <div class="card-body">
                <h5 class="card-title fw-bold">${characterName.toUpperCase()}</h5>
                <p class="card-text">Height: ${characterHeight} decimetres</p>
            </div>
            <div class="card-footer">
                <small class="text-muted">Weight: <span class="fw-bold">${characterWeight} hectograms</span></small>
                </div>
        </div>
    </div>
    `
}

// -----------------------------------------------------------Búsqueda
let searchBtn = document.querySelector(".searchBtn");
searchBtn.addEventListener("click", (e) => {
    e.preventDefault();
    let url = "https://pokeapi.co/api/v2/pokemon/";
    let searchBar = (document.querySelector(".searchBar").value);
    searchBar = searchBar.toLowerCase();
    if(searchBar == "") {
        alert("Digite el nombre de un Pokemon o digite el Id del Pokemon");
    }
    else {
        url+= `${searchBar}/`;
        search(url);
    }
})

// -----------------------------------------------------------Home
window.addEventListener("DOMContentLoaded", onLoad(url));
let home = document.querySelector(".home");
home.addEventListener("click", ()=>{
    onLoad(url);
});


