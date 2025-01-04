const countries = ["deutschland", "france", "italy", "brazil", "portugal", "spain"]; // Lista de países a serem exibidos
const cardsContainer = document.getElementById("cards-container");

countries.forEach(country => {
    fetch(`https://restcountries.com/v3.1/name/${country}`)
        .then(response => response.json())
        .then(data => {
            const countryData = data[0]; // Primeiro resultado da API

            // Obter o código da moeda do país
            const currencyCode = Object.keys(countryData.currencies)[0];
            const currencyName = countryData.currencies[currencyCode]?.name;

            // Adicionar a moeda ao card
            fetch(`https://restcountries.com/v3.1/currency/${currencyCode}`)
                .then(currencyResponse => currencyResponse.json())
                .then(currencyData => {
                    const currencyCountryData = currencyData[0]; // Informações sobre a moeda
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
                })
                .catch(error => {
                    console.error(`Erro ao buscar dados da moeda ${currencyCode}:`, error);
                });
        })
        .catch(error => {
            console.error(`Erro ao buscar dados do país ${country}:`, error);
        });
});