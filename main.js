const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

const input = document.querySelector(".search");
const cities = [];

fetch(endpoint).then(response => {
    return response.json();
}).then(data => {
    for (element of data) {
        const city = element.city;
        const population = element.population;
        const state = element.state;
        cities.push({city: `${city}`, population: `${population}`, state: `${state}`});
    }
});

input.addEventListener("keyup", function(event) {
    getList(event);
});

function getList(event) {
    const search = event.target;
    const list = document.querySelector(".suggestions");

    if (search.value.length <= 0) {
        list.innerHTML = "";
        return;
    } else {
        list.innerHTML = "";

        for (city of cities) {
            let listItem = document.createElement("li");
            listItem.innerHTML = `${city.city}, ${city.state} <span class="population">${city.population}</span>`;
            list.appendChild(listItem);
        }
    }
}