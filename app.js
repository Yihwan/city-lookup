const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

const cities = [];

fetch(endpoint)
  .then(blob => blob.json())
  .then(data => {
    data.forEach(city => {
      cities.push(city);
    });
  });

function findMatches(input, allData) {
  return allData.filter(place => {
    const regex = new RegExp(input, 'gi');
    return place.city.match(regex) || place.state.match(regex);
  });
}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function displayMatches(e) {
  const matchArray = findMatches(e.target.value, cities);

  const html = matchArray.map(place => {
    const regex = new RegExp(e.target.value, 'gi');

    const cityName = place.city.replace(regex,
      `<span class="hl">${e.target.value}</span>`);

    const stateName = place.state.replace(regex,
      `<span class="hl">${e.target.value}</span>`);

    return `
      <li>
        <span class="name">
          ${cityName}, ${stateName}
        </span>
        <span class="population">${numberWithCommas(place.population)}</span>
      </li>
    `;
  }).join('');

  suggestions.innerHTML = html;
}

const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');

searchInput.addEventListener('change', displayMatches);
searchInput.addEventListener('keyup', displayMatches);
