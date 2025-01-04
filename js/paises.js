$(document).ready(function () {
    const countries = []; // Array para armazenar os países
    let favorites = JSON.parse(localStorage.getItem("favorites")) || []; // Favoritos

    // Função para carregar os países da API com jQuery AJAX
    function loadCountries() {
        $.ajax({
            url: 'https://restcountries.com/v3.1/all', // API com todos os países
            method: 'GET',
            success: function (data) {
                data.forEach(function (country) {
                    const countryData = {
                        name: country.name.common,
                        code: country.cca3,
                        imageUrl: country.flags.png, // Imagem da bandeira
                        capital: country.capital ? country.capital[0] : 'N/A', // Capital
                        population: country.population, // População
                        region: country.region, // Região
                        language: country.languages ? Object.values(country.languages).join(', ') : 'N/A', // Idiomas
                        currency: country.currencies ? Object.values(country.currencies).map(c => c.name).join(', ') : 'N/A' // Moeda
                    };
                    countries.push(countryData); // Adiciona ao array de países
                });
                renderCountries(countries); // Renderiza os países na tela
            },
            error: function (err) {
                console.error("Erro ao carregar os países:", err);
            }
        });
    }

    // Função para renderizar os países na tela
    function renderCountries(countriesToRender) {
        const countriesList = $("#countries-list");
        countriesList.empty(); // Limpa a lista de países

        countriesToRender.forEach(function (country) {
            const isFavorite = isCountryFavorite(country.code); // Verifica se o país está nos favoritos
            const buttonClass = isFavorite ? 'active' : '';
            const countryElement = `
                <div class="col-md-4 col-sm-6">
                    <div class="card country-card">
                        <img src="${country.imageUrl}" class="card-img-top" alt="Bandeira do ${country.name}">
                        <div class="card-body">
                            <h5 class="card-title">${country.name}</h5>
                            <p><strong>Capital:</strong> ${country.capital}</p>
                            <p><strong>População:</strong> ${country.population}</p>
                            <p><strong>Região:</strong> ${country.region}</p>
                            <p><strong>Idioma:</strong> ${country.language}</p>
                            <p><strong>Moeda:</strong> ${country.currency}</p>
                            <button class="btn favorite-btn ${buttonClass} ${isFavorite ? 'btn-danger' : 'btn-success'}" data-country-code="${country.code}">
                                ${isFavorite ? 'Remover dos Favoritos' : 'Adicionar aos Favoritos'}
                            </button>
                        </div>
                    </div>
                </div>
            `;
            countriesList.append(countryElement);
        });

        // Adiciona o evento de clique nos botões de favoritos
        $(".favorite-btn").each(function () {
            $(this).on("click", toggleFavorite);
        });
    }

    // Função para verificar se o país já está nos favoritos
    function isCountryFavorite(countryCode) {
        return favorites.includes(countryCode);
    }

    // Função para alternar entre adicionar e remover de favoritos
    function toggleFavorite(event) {
        const countryCode = $(event.target).data('country-code');
        if (isCountryFavorite(countryCode)) {
            removeFavorite(countryCode);
        } else {
            addFavorite(countryCode);
        }

        // Re-renderiza a lista de países após modificar os favoritos
        renderCountries(countries);
        
    }

    // Função para adicionar um país aos favoritos
    function addFavorite(countryCode) {
        if (!isCountryFavorite(countryCode)) {
            favorites.push(countryCode); // Adiciona o código do país
            localStorage.setItem("favorites", JSON.stringify(favorites)); // Atualiza no localStorage
        }
    }

    // Função para remover um país dos favoritos utilizando splice
    function removeFavorite(countryCode) {
        const index = favorites.indexOf(countryCode);
        if (index !== -1) {
            favorites.splice(index, 1); // Remove o item do array usando splice
            localStorage.setItem("favorites", JSON.stringify(favorites)); // Atualiza no localStorage
        }
    }


    // Função de filtro da pesquisa
    function filterCountries(event) {
        const searchTerm = event.target.value.toLowerCase();
        const filteredCountries = countries.filter(function (country) {
            return country.name.toLowerCase().includes(searchTerm);
        });
        renderCountries(filteredCountries);
    }

    // Inicializa a renderização dos países
    loadCountries();

   
    // Evento de busca
    $("#search-input").on('input', filterCountries);
});