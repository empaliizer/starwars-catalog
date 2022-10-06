let apiPeople = 'https://swapi.dev/api/people/';
let current = 1;
let totalPages;
let characterActiveClassName = 'dark--active';
const characterList = document.querySelector('.characters');
const nextButton = document.querySelector('.next');
const prevButton = document.querySelector('.prev');

const fetchPeople = (page) => {

    document.querySelector('.current-page').innerHTML = page;
    characterList.innerHTML = "";

    fetch(`${apiPeople}?page=${page}`)
        .then(response => response.json())
        .then(data => {

            if(!totalPages) {
                totalPages = Math.ceil(data.count / 10);
                document.querySelector('.total-page').innerHTML = totalPages;
            }

            for(let result of data.results) {
                createCharacterList(result);
            }

        })

}

const createCharacterList = (result) => {
    const character = document.createElement('li');
    character.innerHTML = result.name;
    characterList.appendChild(character);
    character.addEventListener('click',() => {
        if(document.querySelector('.dark--active')) {
            document.querySelector('.dark--active').classList.remove('dark--active');
        }
        character.classList.add('dark--active');
        const detailLight = document.querySelector('.details-box-light');
        detailLight.querySelector('h4').innerHTML = result.name;
        detailLight.querySelector('ul').innerHTML = `
            <li>Height: ${result.height} cm</li>
            <li>Mass: ${result.mass} kg</li>
            <li>Hair color: ${result.hair_color}</li>
            <li>Skin color: ${result.skin_color}</li>
            <li>Eye Color: ${result.eye_color}</li>
            <li>Birth_Year: ${result.birth_year}</li>
            <li>Gender: ${result.gender}</li>
        `;
        fetch(result.homeworld)
            .then(response => response.json())
            .then(data => {
                const detailDark = document.querySelector('.details-box-dark');
                detailDark.querySelector('h4').innerHTML = data.name;
                detailDark.querySelector('ul').innerHTML = `
                    <li>Rotation period: ${data.rotation_period}h</li>
                    <li>Orbital period ${data.orbital_period} days</li>
                    <li>Diameter: ${data.diameter} km</li>
                    <li>Climate: ${data.climate}</li>
                    <li>Terrain: ${data.terrain}</li>
                `;
            });
    })
}

/* First time */
fetchPeople(current);

nextButton.addEventListener('click',() => {
    if(current != totalPages) {
        current++;
        fetchPeople(current);
    }
})

prevButton.addEventListener('click',() => {
    if(current != 1) {
        current--;
        fetchPeople(current);
    }
})