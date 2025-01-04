/*
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
*/
$(document).ready(function() {
    
    // Requisição para obter todos os países da API
    const apiUrl = 'https://restcountries.com/v3.1/all?fields=name,capital,currencies,flags';
  
    // Função para preencher os cards com base na pesquisa
    function fillCards(countries) {
      const cardsContainer = $('#cards-container');
      cardsContainer.empty(); // Limpa os cards existentes
  
      if (countries.length === 0) {
        cardsContainer.append('<p>Nenhum país encontrado.</p>');
      } else {
        countries.forEach(country => {
          const card = `
            <div class="col">
              <div class="card h-100">
                <img src="${country.flags.png}" class="card-img-top" alt="Flag of ${country.name.official}">
                <div class="card-body">
                  <h5 class="card-title">${country.name.official}</h5>
                  <p class="card-text">Capital: ${country.capital ? country.capital[0] : 'N/A'}</p>
                  <p class="card-text">Moeda: ${country.currencies ? Object.values(country.currencies)[0].name : 'N/A'}</p>
                </div>
              </div>
            </div>
          `;
          cardsContainer.append(card);
        });
      }
    }
  
    // Função para buscar os países na API
    function searchInAPI(query) {
      console.log("Buscando países para a pesquisa:", query); // Log de depuração
  
      $.ajax({
        url: apiUrl,
        method: 'GET',
        success: function(data) {
          console.log("Dados recebidos da API:", data); // Log para verificar se os dados estão chegando
  
          // Filtra os dados da API com base na pesquisa
          const filteredCountries = data.filter(country => {
            const nameMatch = country.name.official.toLowerCase().includes(query);
            const capitalMatch = country.capital && country.capital[0].toLowerCase().includes(query);
            const currencyMatch = country.currencies && Object.values(country.currencies)[0].name.toLowerCase().includes(query);
            return nameMatch || capitalMatch || currencyMatch;
          });
  
          fillCards(filteredCountries); // Preenche os cards com os dados filtrados
        },
        error: function(xhr, status, error) {
          console.error("Erro na requisição:", status, error); // Log de erro
          alert('Erro ao buscar na API.');
        }
      });
    }
  
    // Evento do formulário de pesquisa
    $('#search').on('input', function() {
      const query = $(this).val().trim().toLowerCase();
  
      // Se o campo de pesquisa estiver vazio, exibe todos os países da API
      if (query === '') {
        searchInAPI('');
      } else {
        searchInAPI(query);
      }
    });
  
    // Inicializa a busca com todos os países da API ao carregar a página
    searchInAPI('');
  });