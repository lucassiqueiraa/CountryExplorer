/*document.getElementById("footer-placeholder").innerHTML = fetch("footer.html")
    .then(response => response.text())
    .then(data => {
        document.getElementById("footer-placeholder").innerHTML = data;
    })
    .catch(error => {
        console.error('Erro ao carregar o footer: ', error);
    });
    */
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