document.addEventListener("DOMContentLoaded", function() {
    const carousel = document.getElementById('carouselExampleCaptions');
  
    // Verifique se o carrossel está sendo encontrado
    console.log(carousel); // Deve exibir o elemento do carrossel no console
  
    // Detecta a mudança de slide
    $(carousel).on('slid.bs.carousel', function() {
      // Verifica qual slide está ativo e altera o fundo
      const activeSlide = $(carousel).find('.carousel-item.active');
      
      // Exibe o índice do slide ativo para depuração
      console.log("Índice do slide ativo:", activeSlide.index());
  
      if (activeSlide.index() === 1) { // Sydney, segundo slide (índice 1)
        // Muda o fundo para preto
        $(carousel).css('background-color', 'black');
      } else {
        // Define o fundo para a cor padrão
        $(carousel).css('background-color', '#D9D9D9');
      }
    });
  
    // Quando a página carregar, define o fundo do carrossel
    const activeSlide = $(carousel).find('.carousel-item.active');
    console.log("Índice do slide ativo na carga:", activeSlide.index());
    
    if (activeSlide.index() === 1) {
      $(carousel).css('background-color', 'black');
    } else {
      $(carousel).css('background-color', '#D9D9D9');
    }
  });
  