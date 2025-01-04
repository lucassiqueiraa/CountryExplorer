// Mostra o formulário ao clicar no link de contacto
document.querySelectorAll('.contact-link').forEach(function(button) {
    button.addEventListener('click', function(e) {
        e.preventDefault(); // Impede o comportamento padrão do link
        document.getElementById('contact-form').style.display = 'block'; // Mostra o formulário
    });
});
