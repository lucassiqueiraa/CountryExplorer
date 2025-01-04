$(document).ready(function() {
  $.ajax({
    url: 'https://restcountries.com/v3.1/all', 
    method: 'GET',
    success: function(countries) {
      var randomCountry = countries[Math.floor(Math.random() * countries.length)];
      var countryCode = randomCountry.cca3;
      var randomLink = `detalhesPais.html?country=${countryCode}`;

      $('#randomCountryLink').attr('href', randomLink);

      $('#randomCountryLink').on('click', function(event) {
        window.location.href = randomLink; 
      });
    },
    error: function(err) {
      console.log("Erro ao carregar a lista de países:", err);
    }
  });
});


$(document).ready(function() {
  var countryCode = new URLSearchParams(window.location.search).get('country');

  if (countryCode) {
    $.ajax({
      url: `https://restcountries.com/v3.1/alpha/${countryCode}`,
      method: "GET",
      success: function(data) {
        var country = data[0];
        var table = generateCountryTable(country); 
        $('#country-details').html(table); 
      },
      error: function(err) {
        console.log("Erro ao carregar os detalhes do país:", err);
      }
    });
  } else {
    console.log("Código de país não encontrado.");
  }
});

function generateCountryTable(country) {
  return `
      <h1>${country.name.official}</h1>
      <table class="tabelaDetalhes">
          <tr><th><i class="bi bi-globe"></i> Nome Oficial</th><td>${country.name.official}</td></tr>
          <tr><th><i class="bi bi-flag"></i> Nome Comum</th><td>${country.name.common}</td></tr>
          <tr><th><i class="bi bi-house-door"></i> Capital</th><td>${country.capital ? country.capital[0] : "N/A"}</td></tr>
          <tr><th><i class="bi bi-arrows-angle-expand"></i> Área</th><td>${country.area} km²</td></tr>
          <tr><th><i class="bi bi-person-lines-fill"></i> População</th><td>${country.population}</td></tr>
          <tr><th><i class="bi bi-cash"></i> Moeda</th><td>${country.currencies ? Object.values(country.currencies)[0].name : "N/A"}</td></tr>
          <tr><th><i class="bi bi-chat"></i> Idiomas</th><td>${country.languages ? Object.values(country.languages).join(", ") : "N/A"}</td></tr>
          <tr><th><i class="bi bi-globe-americas"></i> Região</th><td>${country.region}</td></tr>
          <tr><th><i class="bi bi-globe-europe-africa"></i> Sub-região</th><td>${country.subregion}</td></tr>
          <tr><th><i class="bi bi-flag-fill"></i> Bandeira</th><td><img src="${country.flags.png}" alt="Flag"></td></tr>
          <tr><th><i class="bi bi-clock"></i> Fuso Horário</th><td>${country.timezones ? country.timezones[0] : "N/A"}</td></tr>
          <tr><th><i class="bi bi-geo-alt"></i> Localização</th><td>${country.latlng ? country.latlng.join(", ") : "N/A"}</td></tr>
      </table>
  `;
}
