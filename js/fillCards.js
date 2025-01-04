const countries = ["deutschland", "france", "italy", "brazil", "portugal", "spain"]; // Lista de países
const cardsContainer = document.getElementById("cards-container");

countries.forEach(country => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", `https://restcountries.com/v3.1/name/${country}`, true);

    xhr.onload = function () {
        if (xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);
            const countryData = data[0];

            // Obter o código da moeda
            const currencyCode = Object.keys(countryData.currencies)[0];
            const currencyName = countryData.currencies[currencyCode]?.name;

            // Criar o card
            const cardHTML = `
                <div class="col">
                    <div class="card h-100">
                        <img src="${countryData.flags.svg}" class="card-img-top" alt="Bandeira de ${countryData.name.common}">
                        <div class="card-body">
                            <h5 class="card-title">${countryData.name.common}</h5>
                            <p class="card-text">
                                Capital: ${countryData.capital ? countryData.capital[0] : 'N/A'}<br>
                                Região: ${countryData.region}<br>
                                Moeda: ${currencyName} (${currencyCode})
                            </p>
                        </div>
                        <div class="card-footer">
                            <small class="text-body-secondary">População: ${countryData.population.toLocaleString()}</small>
                        </div>
                    </div>
                </div>
            `;
            cardsContainer.innerHTML += cardHTML;
        } else {
            console.error(`Erro ao buscar dados do país ${country}: ${xhr.statusText}`);
        }
    };

    xhr.onerror = function () {
        console.error("Erro na requisição AJAX");
    };

    xhr.send();
});