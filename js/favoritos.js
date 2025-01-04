$(document).ready(function () {
    // Recupera os favoritos do localStorage
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const countries = []; // Array para armazenar os dados dos países

    // Função para buscar os detalhes dos países usando a API
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
                    capital: country.capital ? country.capital[0] : 'N/A', // Capital
                    population: country.population, // População
                    region: country.region, // Região
                    language: country.languages ? Object.values(country.languages).join(', ') : 'N/A', // Idiomas
                    currency: country.currencies ? Object.values(country.currencies).map(c => c.name).join(', ') : 'N/A' // Moeda
                };
                countries.push(countryData);
                renderFavorites(); // Renderiza os favoritos
            },
            error: function (err) {
                console.log("Erro ao carregar os dados do país:", err);
            }
        });
    }

    // Carrega todos os países favoritos do localStorage
    favorites.forEach(function (favorite) {
        loadCountryDetails(favorite);
    });

    // Função para renderizar os favoritos na tela
    function renderFavorites() {
        const favoritesList = $('#favorites-list');
        favoritesList.empty(); // Limpa a lista de favoritos

        countries.forEach(function (country) {
            const isFavorite = favorites.includes(country.code);
            const buttonClass = isFavorite ? 'active' : '';
            const favoriteElement = `
                <div class="col-md-4 col-sm-6 mb-4">
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

        // Adiciona o evento de clique nos botões de favoritos
        $(".favorite-btn").each(function () {
            $(this).on("click", toggleFavorite);
        });
    }

    // Função para alternar entre adicionar e remover de favoritos
    function toggleFavorite(event) {
        const countryCode = $(event.target).data('country-code');

        // Verifica se o país já está nos favoritos e alterna o estado
        if (favorites.includes(countryCode)) {
            // Remove o país dos favoritos
            favorites = favorites.filter(function (code) {
                return code !== countryCode;
            });
        } else {
            // Adiciona o país aos favoritos
            favorites.push(countryCode);
        }

        // Atualiza os favoritos no localStorage
        localStorage.setItem("favorites", JSON.stringify(favorites));

        // Re-renderiza a lista de países e favoritos
        renderFavorites();
    }
});