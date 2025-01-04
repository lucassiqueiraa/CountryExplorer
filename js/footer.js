const xhr = new XMLHttpRequest();
xhr.open("GET", "footer.html", true);

xhr.onload = function () {
    if (xhr.status === 200) {
        document.getElementById("footer-placeholder").innerHTML = xhr.responseText;
    } else {
        console.error(`Erro ao carregar o footer: ${xhr.statusText}`);
    }
};

xhr.onerror = function () {
    console.error("Erro na requisição AJAX para o footer");
};

xhr.send();