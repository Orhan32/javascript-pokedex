// Elementleri Seç
const pokemonForm = document.getElementById("poke-search");
const pokeInput = document.getElementById("poke-input");
const searchButton = document.getElementById("btn-search");
const pokeContainer = document.getElementById("card-container");

const pokeCount = 200;
const colors = {
    fire: "#FDDFDF",
    grass: "#DEFDE8",
    electiric: "#FCF7DE",
    water: "#DEF3FD",
    ground: "#F4E7DA",
    rock: "#D5D5D4",
    fairy: "#FCEAFF",
    posion: "#D6B3FF",
    bug: "#F8D5A3",
    dragon: "#97B3E6",
    psychic: "#EAEDA1",
    flying: "#F5F5F5",
    fighting: "#E6E0D4",
    normal: "#F5F5F5",
    ice: "#E0F5FF",
}

pokeInput.addEventListener("input", function () {
    const search = pokeInput.value.toLowerCase().trim();
    const pokes = document.querySelectorAll("#poke-name");

    pokes.forEach(card => {
        const text = card.textContent.toLocaleLowerCase();
        if (text.indexOf(search) === -1) {
            card.parentElement.style.display = "none";
        }
        else {
            card.parentElement.style.display = "block";
        }
    });

});

const initPokemon = async () => {
    for (let i = 1; i <= pokeCount; i++) {
        await getPokemon(i);
    }
}

const getPokemon = async (id) => {
    let url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    let res = await fetch(url);
    let data = await res.json();
    createPokemonBox(data);
}

const createPokemonBox = (pokemon) => {
    const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
    const id = pokemon.id.toString().padStart(3, "0");
    const weight = pokemon.weight;
    const type = pokemon.types[0].type.name;
    const color = colors[type];

    const pokemons = document.createElement("div");
    pokemons.classList.add("card");
    pokemons.style.backgroundColor = `${color}`;

    pokemons.innerHTML = `
    <img src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/${id}.png" alt="${name} image">
    <h1 id="poke-name">${name}</h1>
    <p>#${id}</p>
    <p>${weight} Kg</p>
    <p>Type: ${type}</p>
    `;

    pokeContainer.appendChild(pokemons);
}

initPokemon();