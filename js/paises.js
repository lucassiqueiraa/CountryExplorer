$(document).ready(function () {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const countries = [];

    function loadCountries() {
        $.ajax({
            url: 'https://restcountries.com/v3.1/all', // API com todos os países
            method: 'GET',
            success: function (data) {
                data.forEach(function (country) {
                    const countryData = {
                        name: country.name.common,
                        code: country.cca3,
                        imageUrl: country.flags.png,
                        capital: country.capital ? country.capital[0] : 'N/A',
                        population: country.population,
                        region: country.region,
                        language: country.languages ? Object.values(country.languages).join(', ') : 'N/A',
                        currency: country.currencies ? Object.values(country.currencies).map(c => c.name).join(', ') : 'N/A'
                    };
                    countries.push(countryData);
                });
                renderCountries(countries); 
            },
            error: function (err) {
                console.error("Erro ao carregar os países:", err);
            }
        });
    }

    function renderCountries(countriesToRender) {
        const countriesList = $("#countries-list");
        countriesList.empty(); 

        countriesToRender.forEach(function (country) {
            const isFavorite = isCountryFavorite(country.code);
            const buttonClass = isFavorite ? 'btn-danger' : 'btn-success';
            const buttonText = isFavorite ? 'Remover dos Favoritos' : 'Adicionar aos Favoritos';

            // Botão para Ver Detalhes do País
            const detailsButton = `<a href="detalhesPais.html?country=${country.code}" class="btn btn-info w-100">Ver Detalhes</a>`;

            const countryElement = `
                <div class="col-md-3 col-sm-6">
                    <div class="card country-card">
                        <img src="${country.imageUrl}" class="card-img-top" alt="Bandeira do ${country.name}">
                        <div class="card-body">
                            <h5 class="card-title">${country.name}</h5>
                            <p><strong>Capital:</strong> ${country.capital}</p>
                            <p><strong>População:</strong> ${country.population}</p>
                            <p><strong>Região:</strong> ${country.region}</p>
                            <p><strong>Idioma:</strong> ${country.language}</p>
                            <p><strong>Moeda:</strong> ${country.currency}</p>
                            <button class="btn ${buttonClass} favorite-btn" data-country-code="${country.code}">
                                ${buttonText}
                            </button>
                            ${detailsButton}  <!-- Aqui está o botão "Ver Detalhes" -->
                        </div>
                    </div>
                </div>
            `;
            countriesList.append(countryElement);
        });

        $(".favorite-btn").each(function () {
            $(this).on("click", toggleFavorite);
        });
    }

    function isCountryFavorite(countryCode) {
        return favorites.includes(countryCode);
    }

    function toggleFavorite(event) {
        const countryCode = $(event.target).data('country-code');

        if (isCountryFavorite(countryCode)) {
            removeFavorite(countryCode);
        } else {
            addFavorite(countryCode);
        }

        renderCountries(countries); 
    }

    function addFavorite(countryCode) {
        if (!isCountryFavorite(countryCode)) {
            favorites.push(countryCode);
            localStorage.setItem("favorites", JSON.stringify(favorites)); 
        }
    }

    function removeFavorite(countryCode) {
        const index = favorites.indexOf(countryCode);
        if (index !== -1) {
            favorites.splice(index, 1); 
            localStorage.setItem("favorites", JSON.stringify(favorites)); 
        }
    }

    loadCountries();

    function filterCountries(event) {
        const searchTerm = event.target.value.toLowerCase();
        const filteredCountries = countries.filter(function (country) {
            return country.name.toLowerCase().includes(searchTerm);
        });
        renderCountries(filteredCountries);
    }

    $("#search-input").on('input', filterCountries);
});
