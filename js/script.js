const pokemonImage = document.querySelector('.pokemon__image');

const pokemonNumber = document.querySelector('.pokemon__number');

const pokemonName = document.querySelector('.pokemon__name');

const form = document.querySelector('.form');
const input = document.querySelector('.input__search');

const buttonPrev = document.querySelector('.button__prev');
const buttonNext = document.querySelector('.button__next');

let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {

    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

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

        pokemonImage.style.display = 'block';

        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];

        pokemonName.innerHTML = data.name;

        pokemonNumber.innerHTML = data.id;

        input.value = '';
        searchPokemon = data.id;
    } else {
        pokemonImage.style.display = 'none';
        pokemonName.innerHTML = 'Não encontrado';
        pokemonNumber.innerHTML = '';
    }
}

form.addEventListener('submit', (e) => {

    e.preventDefault();

    renderPokemon(input.value.toLowerCase());
});

buttonPrev.addEventListener('click', () => {
    if (searchPokemon > 1) {
        searchPokemon -= 1;
        renderPokemon(searchPokemon);
    }
});

buttonNext.addEventListener('click', () => {
    searchPokemon += 1;
    renderPokemon(searchPokemon);
});


renderPokemon(searchPokemon);