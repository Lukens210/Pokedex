const pokeContainer = document.getElementById("pokeContainer")
let qtdPokemons = 1164
const cores = {
    fire: "#FDDFDF",
    grass: "#DEFDE0",
    electric: "#FCF7DE",
    water: "#DEF3FD",
    ground: "#F4E7DA",
    rock: "#D5D5D4",
    fairy: "#FCEAFF",
    poison: "#98D7A5",
    bug: "#F8D5A3",
    dragon: "#97B3E6",
    psychic: "#EAEDA1",
    flying: "#F5F5F5",
    fighting: "#E6E0D4",
    normal: "#F5F5F5",

}
const tiposPrincipais = Object.keys(cores)

const fetchPokemons = async() => {
    for(let i = 1; i <=qtdPokemons; i++){
        await pegarPokemons(i)
    }
}
const pegarPokemons = async(id) =>{
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`
    const resposta = await fetch (url);
    const dados = await resposta.json()

    criarCardPokemons(dados)
}
const criarCardPokemons = (pokemon) => {
    const card = document.createElement("div")
    card.classList.add("pokemon")

    const nome = pokemon.name[0]. toUpperCase() + pokemon.name.slice(1)
    const id = pokemon.id.toString().padStart(3, "0")

    const pokeTipos = pokemon.types.map((types)=>{
        return types.type.name
    })

    const tipo = tiposPrincipais.find((tipo)=>pokeTipos.indexOf(tipo) > -1 )
    const cor = cores [tipo]

    card.style.backgroundColor = cor

    const pokemonInnerHTML = `
        <div class="imgContainer">
            <img src="https://raw.githubusercontent.com/pokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png"
        </div>
        <div class="info">
            <span class="numero">#${id}</span>
            <h3 class="nome">${nome}</h3>
            <small class="tipo">Tipo: <span>${tipo}</span></small>
        </div>`

    card.innerHTML = pokemonInnerHTML
    pokeContainer.append(card)
}

fetchPokemons()