$(document).ready(function () {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const countries = [];

    function loadCountryDetails(code) {
        $.ajax({
            url: `https://restcountries.com/v3.1/alpha/${code}`,
            method: 'GET',
            success: function (data) {
                const country = data[0];
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
                renderFavorites();
            },
            error: function (err) {
                console.log("Erro ao carregar os dados do país:", err);
            }
        });
    }

    favorites.forEach(function (favorite) {
        loadCountryDetails(favorite);
    });

    function renderFavorites() {
        const favoritesList = $('#favorites-list');
        favoritesList.empty();

        countries.forEach(function (country) {
            const isFavorite = favorites.includes(country.code);
            const buttonClass = isFavorite ? 'active' : '';
            const favoriteElement = `
                <div class="col-md-3 col-sm-6 mb-4">
                    <div class="card country-card">
                        <img src="${country.imageUrl}" class="card-img-top" alt="Bandeira do ${country.name}">
                        <div class="card-body">
                            <h5 class="card-title">${country.name}</h5>
                            <p><strong>Capital:</strong> ${country.capital}</p>
                            <p><strong>População:</strong> ${country.population}</p>
                            <p><strong>Região:</strong> ${country.region}</p>
                            <p><strong>Idioma:</strong> ${country.language}</p>
                            <p><strong>Moeda:</strong> ${country.currency}</p>
                            <button class="btn ${buttonClass} ${isFavorite ? 'btn-danger' : 'btn-success'} favorite-btn" data-country-code="${country.code}">
                                ${isFavorite ? 'Remover dos Favoritos' : 'Adicionar aos Favoritos'}
                            </button>
                        </div>
                    </div>
                </div>
            `;
            favoritesList.append(favoriteElement);
        });

        $(".favorite-btn").each(function () {
            $(this).on("click", toggleFavorite);
        });
    }

    function toggleFavorite(event) {
        const countryCode = $(event.target).data('country-code');

        if (favorites.includes(countryCode)) {
            favorites = favorites.filter(function (code) {
                return code !== countryCode;
            });
        } else {
            favorites.push(countryCode);
        }

        localStorage.setItem("favorites", JSON.stringify(favorites));

        renderFavorites();
    }
});
