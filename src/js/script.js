const api = 'https://pokeapi.co/api/v2/pokemon/'
const apiImg = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/'


function showPokemonList(){
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

function getPokemonById(id){
    fetch(api + id).then( response => {
        if (response.status == 200){
            response.json().then( pokemon => {
                let liPokemon = document.createElement("li")
                liPokemon.className = "pokemon";
                let liPokemonImg = document.createElement("img")
                liPokemonImg.src = pokemon.sprites.front_default;
                liPokemon.innerHTML = pokemon.name
                liPokemon.appendChild(liPokemonImg)
                document.getElementById("ListaPokemons").appendChild(liPokemon)
            })
        }
    })
}
