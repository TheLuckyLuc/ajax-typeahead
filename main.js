const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

const input = document.querySelector(".search");
const list = document.querySelector(".suggestions");
const defaultItems = list.innerHTML;
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

input.addEventListener("keyup", getResults);

// function to bring up search results
function getResults() {
    const search = this.value;

    if (search) {
        list.innerHTML = cities
            .filter(city => matchResults(city, search))
            .map(city => listCity(city, search))
            .join('');

        return;
    }
    // Keep the default starting list if no value is present
    list.innerHTML = defaultItems;
}

// Destructure the 'city' variable that's passed into the function, into the 'city' & 'state' keys from the object
function matchResults({city, state}, input) {
    const regExp = new RegExp(input, 'i');

    // Check for any macthes between the user input & the city/state values from the object
    return regExp.test(city) || regExp.test(state);
}

// Same as with the matchResults function, destructure the given variable into the city, state & population object keys
function listCity({city, state, population}, input) {
    // Create a new li containing the matching cities/states & their correlating population count
    // Wrap the resulting variables in the highlight function
    return (
        `<li><span>${highlight(city, input)}, ${highlight(state, input)}</span><span class="population">${population}</span></li>`
    );
}

// Find any matches between user input & the resulting list and replace the matches with highlighted letters
function highlight(text, input) {
    return text.replace( new RegExp(input, 'gi'), (match) => `<span class="highlight">${match}</span>`);
}