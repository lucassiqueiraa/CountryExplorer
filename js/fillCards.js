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
            const isFavorite = favorites.includes(country.code);
            const buttonClass = isFavorite ? 'active' : '';
            const countryElement = `
                <div class="col-md-4 col-sm-6">
                    <div class="card country-card">
                        <img src="${country.imageUrl}" class="card-img-top" alt="Bandeira do ${country.name}">
                        <div class="card-body">
                            <h5 class="card-title">${country.name}</h5>
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

    // Função para alternar entre adicionar e remover de favoritos
    function toggleFavorite(event) {
        const countryCode = $(event.target).data('country-code');
        
        if (favorites.includes(countryCode)) {
            favorites = favorites.filter(function (code) {
                return code !== countryCode;
            });
        } else {
            favorites.push(countryCode);
        }

        // Atualiza os favoritos no localStorage
        localStorage.setItem("favorites", JSON.stringify(favorites));

        // Re-renderiza a lista de países e favoritos
        renderCountries(countries);
        renderFavorites();
    }

    // Função para renderizar os países favoritos
    function renderFavorites() {
        const favoritesList = $("#favorites-list");
        favoritesList.empty();

        const favoriteCountries = countries.filter(function (country) {
            return favorites.includes(country.code);
        });

        favoriteCountries.forEach(function (country) {
            const favoriteElement = `
                <div class="col-md-4 col-sm-6 mb-4">
                    <div class="card country-card">
                        <img src="${country.imageUrl}" class="card-img-top" alt="Bandeira do ${country.name}">
                        <div class="card-body">
                            <h5 class="card-title">${country.name}</h5>
                            <button class="btn favorite-btn btn-danger" data-country-code="${country.code}">
                                Remover dos Favoritos
                            </button>
                        </div>
                    </div>
                </div>
            `;
            favoritesList.append(favoriteElement);
        });

        // Adiciona o evento de clique para remover dos favoritos
        $(".favorite-btn").each(function () {
            $(this).on("click", toggleFavorite);
        });
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

    // Re-renderiza os favoritos
    renderFavorites();

    // Evento de busca
    $("#search-input").on('input', filterCountries);
});
