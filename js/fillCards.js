const countries = ["deutschland", "france", "italy", "brazil", "portugal", "spain"]; // Lista de países
const cardsContainer = document.getElementById("cards-container");

// Função para salvar os favoritos no localStorage
function saveFavorites(favorites) {
    localStorage.setItem('favorites', JSON.stringify(favorites));
}

// Função para obter os favoritos do localStorage
function getFavorites() {
    const favorites = localStorage.getItem('favorites');
    return favorites ? JSON.parse(favorites) : [];
}

// Preenche os cards com os dados dos países
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
                            <label class="form-check-label">
                                <input type="checkbox" class="form-check-input" id="checkbox-${countryData.name.common}">
                                Favoritar
                            </label>
                        </div>
                        <div class="card-footer">
                            <small class="text-body-secondary">População: ${countryData.population.toLocaleString()}</small>
                        </div>
                    </div>
                </div>
            `;
            cardsContainer.innerHTML += cardHTML;

            // Configuração do checkbox
            const checkbox = document.getElementById(`checkbox-${countryData.name.common}`);
            
            // Verifica se o país já está nos favoritos
            const favorites = getFavorites();
            if (favorites.includes(countryData.name.common)) {
                checkbox.checked = true;
            }

            // Adiciona ou remove o país dos favoritos
            checkbox.addEventListener('change', function() {
                let favorites = getFavorites();

                if (this.checked) {
                    favorites.push(countryData.name.common);
                } else {
                    favorites = favorites.filter(fav => fav !== countryData.name.common);
                }

                saveFavorites(favorites); // Salva os favoritos no localStorage
            });
        } else {
            console.error(`Erro ao buscar dados do país ${country}: ${xhr.statusText}`);
        }
    };

    xhr.onerror = function () {
        console.error("Erro na requisição AJAX");
    };

    xhr.send();
});