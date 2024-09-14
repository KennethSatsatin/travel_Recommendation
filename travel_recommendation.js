const search = document.getElementById('btnSearch');
const searchBar = document.getElementById('searchInput');
const btnClear = document.getElementById('btnClear');

function searchButton() {
    const input = searchBar.value.toLowerCase().trim();
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';

    fetch('travel_recommendation_api.json')
        .then(response => response.json())
        .then(data => {
            let found = false;

            if (input === 'countries' || input === 'country') {
                resultDiv.innerHTML += ``;
                data.countries.forEach(country => {
                    resultDiv.innerHTML +=  
                    `<div>
                        <div class="cities">
                            ${country.cities.map(city => `
                                <div class="city">
                                    <img src="${city.imageUrl}" alt="${city.name}" />
                                    <h4>${city.name}</h4>
                                    <p>${city.description}</p>
                                </div>
                            `).join('')}
                        </div>
                    </div>`;
                });
                found = true;
            } else if (input === 'temples' || input === 'temple') {
                resultDiv.innerHTML += ``;
                data.temples.forEach(temple => {
                    resultDiv.innerHTML +=  
                    `<div>
                        <div class="city">
                            <img src="${temple.imageUrl}" alt="${temple.name}" />
                            <h4>${temple.name}</h4>
                            <p>${temple.description}</p>
                        </div>
                    </div>`;
                });
                found = true;
            } else if (input === 'beaches' || input === 'beach') {
                resultDiv.innerHTML += ``;
                data.beaches.forEach(beach => {
                    resultDiv.innerHTML += 
                    `<div>
                        <div class="city">
                            <img src="${beach.imageUrl}" alt="${beach.name}" />
                            <h4>${beach.name}</h4>
                            <p>${beach.description}</p>
                        </div>
                    </div>`;
                });
                found = true;
            } else {
                data.countries.forEach(country => {
                    country.cities.forEach(city => {
                        if (city.name.toLowerCase() === input) {
                            resultDiv.innerHTML += `<h2>${city.name}</h2>`;
                            resultDiv.innerHTML += `<img src="${city.imageUrl}" alt="${city.name}">`;
                            resultDiv.innerHTML += `<p>${city.description}</p>`;
                            found = true;
                        }
                    });
                });

                data.temples.forEach(temple => {
                    if (temple.name.toLowerCase() === input) {
                        resultDiv.innerHTML += `<h2>${temple.name}</h2>`;
                        resultDiv.innerHTML += `<img src="${temple.imageUrl}" alt="${temple.name}">`;
                        resultDiv.innerHTML += `<p>${temple.description}</p>`;
                        found = true;
                    }
                });

                data.beaches.forEach(beach => {
                    if (beach.name.toLowerCase() === input) {
                        resultDiv.innerHTML += `<h2>${beach.name}</h2>`;
                        resultDiv.innerHTML += `<img src="${beach.imageUrl}" alt="${beach.name}">`;
                        resultDiv.innerHTML += `<p>${beach.description}</p>`;
                        found = true;
                    }
                });
            }

            if (!found) {
                resultDiv.innerHTML = `Destination not found`;
            }
        })
        .catch(error => {
            console.error('Error:', error);
            resultDiv.innerHTML = 'An error occurred while fetching data.';
        });
}

search.addEventListener('click', searchButton);

function clearButton() {
    searchBar.value = "";
    document.getElementById('result').innerHTML = '';  // Clear results as well
}

btnClear.addEventListener("click", clearButton);
