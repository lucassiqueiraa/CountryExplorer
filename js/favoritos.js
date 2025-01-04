// Função para exibir os países favoritos
function showFavorites() {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const favoritesContainer = document.getElementById('favorites-container');

    if (favorites.length === 0) {
        favoritesContainer.innerHTML = '<p>Nenhum país favorito ainda.</p>';
    } else {
        favorites.forEach(countryName => {
            const xhr = new XMLHttpRequest();
            xhr.open("GET", `https://restcountries.com/v3.1/name/${countryName}`, true);

            xhr.onload = function () {
                if (xhr.status === 200) {
                    const data = JSON.parse(xhr.responseText);
                    const countryData = data[0];

                    // Criar o card para exibir o país favorito
                    const cardHTML = `
                        <div class="col">
                            <div class="card h-100">
                                <img src="${countryData.flags.svg}" class="card-img-top" alt="Bandeira de ${countryData.name.common}">
                                <div class="card-body">
                                    <h5 class="card-title">${countryData.name.common}</h5>
                                    <p class="card-text">Este é um dos seus países favoritos!</p>
                                </div>
                            </div>
                        </div>
                    `;
                    favoritesContainer.innerHTML += cardHTML;
                } else {
                    console.error(`Erro ao buscar dados do país ${countryName}: ${xhr.statusText}`);
                }
            };

            xhr.onerror = function () {
                console.error("Erro na requisição AJAX");
            };

            xhr.send();
        });
    }
}

// Exibir os favoritos ao carregar a página
document.addEventListener('DOMContentLoaded', showFavorites);