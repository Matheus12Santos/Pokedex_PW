const api = 'https://pokeapi.co/api/v2/pokemon/'
const apiImg = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/'

let backpack = [];

function showPokemonList() {
    let listaPokemons = [];
    let count = 1;
    fetch(api + '?limit=251').then(Response => {
        if (Response.status == 200) {
            listaPokemons = Response.json().then(json => {
                json.results.map(pokemon => {
                    let liPokemon = document.createElement("li");
                    liPokemon.className = "pokemon";
                    let liPokemonImg = document.createElement("img");
                    liPokemonImg.className = "pokemon-img";
                    let button = document.createElement('button');
                    button.textContent = 'Capturar';
                    button.className = 'capture-button';
                    button.addEventListener('click', function() {
                        if (backpack.length < 6) {
                            if (!backpack.find(p => p.name === pokemon.name)) { 
                                fetch(pokemon.url).then(Response => {
                                    pokemonImg = Response.json().then((pokemon) => {
                                        liPokemonImg.src = pokemon.sprites.front_default;
                                        pokemon.image = liPokemonImg.src;
                                        backpack.push(pokemon);
                                        updateBackpackModal();
                                    });
                                });
                            } else {
                                alert('Você já capturou este Pokémon!');
                            }
                        } else {
                            alert('Sua mochila está cheia!');
                        }
                    });
                    fetch(pokemon.url).then(Response => {
                        pokemonImg = Response.json().then((pokemon) => {
                            liPokemonImg.src = pokemon.sprites.front_default;
                        });
                    });
                    liPokemon.innerHTML = count + '. ' + pokemon.name;
                    liPokemon.appendChild(liPokemonImg);
                    liPokemon.appendChild(button);
                    document.getElementById("ListaPokemons").appendChild(liPokemon);
                    count++;
                });
                return json;
            });
            return listaPokemons;
        }
    });
}

function updateBackpackModal() {
    const backpackModal = document.getElementById('backpack_modal');
    backpackModal.innerHTML = '';
    const counter = document.createElement('p');
    counter.textContent = `Pokémon na mochila: ${backpack.length}/6`;
    backpackModal.appendChild(counter);
    const grid = document.createElement('div');
    grid.className = 'pokemon-grid'; 
    backpack.forEach((pokemon, index) => {
        const div = document.createElement('div');
        const p = document.createElement('p');
        p.textContent = pokemon.name;
        p.className = "pokemon-name";
        const img = document.createElement('img');
        img.src = pokemon.image;
        img.className = "pokemon-img";
        img.addEventListener('click', function() {
            backpack.splice(index, 1);
            updateBackpackModal();
        });
        div.appendChild(p);
        div.appendChild(img);
        grid.appendChild(div);
    });
    backpackModal.appendChild(grid);
}

showPokemonList()

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('searchBar').addEventListener('keydown', function(e) {
        if (e.keyCode === 13) {
            searchIdPokemon();
        }
    });
});

function searchIdPokemon() {
    var id = document.getElementById('searchBar').value;
    if (id > 0 && id < 251) {
        fetch(api + id)
            .then(response => response.json())
            .then(pokemon => {
                var modalContent = '<br><img src="' + pokemon.sprites.front_default + '">' +
                    'Nome: ' + pokemon.name +
                    '<br>ID: ' + pokemon.id +
                    '<br>Altura: ' + pokemon.height +
                    '<br>Peso: ' + pokemon.weight +
                    '<br>Habilidades: ' + pokemon.abilities.map(a => a.ability.name).join(', ') +
                    '<br>Tipos: ' + pokemon.types.map(t => t.type.name).join(', ');
                document.getElementById('selection').innerHTML = modalContent;
                console.log(pokemon.name);
            });
        var modal = document.getElementById('tela');
        modal.style.display = "block";
        modal.addEventListener('click', function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        });
    }
    else {
        var modalContent = 'Pokemon não encontrado' + '<br><img id="not_found" src="./src/imagens/pokemon_not_found.png" alt="pokemon_nao_encontrado">';
        document.getElementById('selection').innerHTML = modalContent;
        var modal = document.getElementById('tela');
        modal.style.display = "block";
        var poke_sumir = document.getElementById('pokebola')
        poke_sumir.style.display = "none";
        modal.addEventListener('click', function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        });
    }
}

window.addEventListener('click', function(event) {
    var modal = document.getElementById('myModal');
    if (event.target == modal) {
        modal.style.display = "none";
    }
});

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("backpack").addEventListener("click", function() {
        document.getElementById("backpack_modal").style.display = "block";
    });
});

window.onclick = function(event) {
    const backpackModal = document.getElementById('backpack_modal');
    if (event.target == backpackModal) {
        backpackModal.style.display = "none";
    }
}

window.onclick = function(event) {
    const backpackModal = document.getElementById('backpack_modal');
    if (event.target == backpackModal && event.target.className != 'pokemon-grid') {
        backpackModal.style.display = "none";
    }
}

