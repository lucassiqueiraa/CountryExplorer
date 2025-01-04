document.querySelectorAll('.contact-link').forEach(function(button) {
    button.addEventListener('click', function(e) {
        e.preventDefault(); 
        document.getElementById('contact-form').style.display = 'block'; 
    });
});
