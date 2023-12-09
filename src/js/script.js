const api = 'https://pokeapi.co/api/v2/pokemon/'
const apiImg = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/'


function showPokemonList() {
    let listaPokemons = []
    let count = 1
    fetch(api + '?limit=251').then( Response => {
        if (Response.status == 200){
            listaPokemons = Response.json().then( json => {json.results.map( pokemon => { 
                let liPokemon = document.createElement("li")
                liPokemon.className = "pokemon";
                let liPokemonImg = document.createElement("img")
                fetch(pokemon.url).then(Response => { pokemonImg = Response.json().then( (pokemon) => {(liPokemonImg.src = pokemon.sprites.front_default)})})
                liPokemon.innerHTML = count + '. ' + pokemon.name
                liPokemon.appendChild(liPokemonImg)
                document.getElementById("ListaPokemons").appendChild(liPokemon)
                count++;
            })
            return json})
            return listaPokemons
        }
    })
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
    }
    else {
        
    }
}


window.addEventListener('click', function(event) {
    var modal = document.getElementById('myModal');
    if (event.target == modal) {
        modal.style.display = "none";
    }
});