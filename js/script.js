const pokemonImage = document.querySelector('.pokemon__image');

const pokemonNumber = document.querySelector('.pokemon__number');

const pokemonName = document.querySelector('.pokemon__name');

const form = document.querySelector('.form');
const input = document.querySelector('.input__search');

const fetchPokemon = async (pokemon) => {

    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.toLowerCase()}`);

    if (APIResponse.status === 200) {

        const data = await APIResponse.json();

        return data;

    } else { return false; }

};

const renderPokemon = async (pokemon) => {

    pokemonNumber.innerHTML = '';
    pokemonName.innerHTML = '...';

    const data = await fetchPokemon(pokemon);

    if (data) {

        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];

        pokemonName.innerHTML = data.name;

        pokemonNumber.innerHTML = data.id;

        input.value = '';
    } else {
        pokemonName.innerHTML = 'Não encontrado';
        pokemonNumber.innerHTML = '';
    }
}

form.addEventListener('submit', (e) => {

    e.preventDefault();

    renderPokemon(input.value);
})