class PokeService {
    // Controla as buscas com os ids
    getPokemons() {
        let randomNumbers = this.generateRandomNumbers();

        randomNumbers.forEach( id => {

            this.getPokemon(id)

        })

    }

    // Busca unidade de pokemon na api
    getPokemon(id) {

        let URL_TO_FETCH = 'https://pokeapi.co/api/v2/pokemon/';

        fetch(URL_TO_FETCH + id, {
            method: 'get'
        })
        .then( response => response.json())
        .then( pokemon => {

            pokemons.push(this.formatPokemon(pokemon))

            if (pokemons.length == 6) {
                viewControl.createCards();
            }

        })
        
        

    }

    // formatar pokemon para formato no front-end
    formatPokemon(response) {
        let pokemon = {
            image: response.sprites.other['official-artwork']['front_default'],
            name: response.name,
            id: response.id,
            types: response.types.map( type => type.type.name)
        };
        return pokemon;

    }

    // gerar os numeros de ids aleatorios
    generateRandomNumbers() {
        let result = [];

        while(result.length < 6) {
            result.push(Math.floor((Math.random() * 150)) + 1)
        }

        return result;
    }

}

class ViewControl {

    cardsContainer = document.getElementsByClassName('cards-container')[0];

    // criar o card
    createCard(pokemon) {
        let card = `
        <div class="card">
            <h3>${pokemon.name}</h3>
            <img src="${pokemon.image}">
            <span>Tipos: ${pokemon.types.join(' ,')}</span>        
        </div>
        `

        return card;
    }

    // Juntar os cards
    createCards() {

        let html = '';

        pokemons.forEach(pokemon => {

            html = html + this.createCard(pokemon)

        })

        this.render(html)

    }

    // Renderizar a tela
    render(html) {
        
        this.cardsContainer.innerHTML = html;

    }

}

let pokeService = new PokeService()
let viewControl = new ViewControl()

let pokemons = [];


init()

function init() {

    pokeService.getPokemons();

}