const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

const input = document.querySelector(".search");
const list = document.querySelector(".suggestions");
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
    const search = event.target;
    const val = this.value;

    if (search.value.length <= 0) {
        list.innerHTML = "";
        return;
    } else {
        list.innerHTML = "";

        for (let i = 0;  i < cities.length; i++) {
            if (cities[i].city.substr(0, val.length).toUpperCase() == val.toUpperCase() || cities[i].state.substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                let listItem = document.createElement("li");
                listItem.innerHTML = `${cities[i].city.substr(0, val.length)}${cities[i].city.substr(val.length)}, ${cities[i].state.substr(0, val.length)}${cities[i].state.substr(val.length)} <span class="population">${cities[i].population}</span>`;
                list.appendChild(listItem);
            }
        }
    }
});