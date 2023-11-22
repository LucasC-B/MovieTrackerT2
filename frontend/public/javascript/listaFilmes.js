document.addEventListener('DOMContentLoaded', function () {
    fetch(backendAddress + 'filmes/list', {
        method: 'GET',
    }).then(function (response) {
        response.json().then(function (filmeListing) {
            var filmeList = document.getElementById("filmeList");
            filmeList.innerHTML = '';
            filmeListing.results.reverse();
            filmeListing.results.forEach(function (filme) {
                var filmeDetail = criaListaFilmes(filme);
                filmeList.appendChild(filmeDetail);
            }); 
        }).catch(function (error) {
            console.error("Erro:", error);
        });
    });
})

function criaListaFilmes(filme) {
    var div = document.createElement('div')
    div.className = 'card m-auto text-bg-dark mb-3'

    var cardDetail = document.createElement('div');
    cardDetail.className = 'card-body my-2';

    div.appendChild(cardDetail)

    var headerFilme = document.createElement('p');
    headerFilme.className = 'card-text'
    headerFilme.textContent = "Filme: " + filme.titulo + "      Lançado: " + filme.ano;
    cardDetail.appendChild(headerFilme);

    var hr = document.createElement('hr')
    cardDetail.appendChild(hr)

    var reviewFilme = document.createElement('pre');
    reviewFilme.className = 'card-text text-bg-dark';
    reviewFilme.textContent = filme.review;
    cardDetail.appendChild(reviewFilme);

    var notaFilme = document.createElement('h3');
    notaFilme.className = 'card-text';
    noteFilme.textContent = filme.nota;
    cardDetail.appendChild(notaFilme);

    var hr1 = document.createElement('hr')
    cardDetail.appendChild(hr1)

    var footerFilme = document.createElement('div');
    footerFilme.className = 'card-footer text-muted text-bg-dark';
    footerFilme.textContent = "Postado por: " + filme.usuario;

    div.appendChild(cardDetail)
    div.appendChild(footerFilme)

    var filmeLink = document.createElement('a');
    filmeLink.style = "text-decoration: none !important";
    filmeLink.className = "link-dark";
    filmeLink.href = 'detalhesFilme.html?slug=' + filme.slug;
    filmeLink.addEventListener('click', function (event) {
        event.preventDefault();
        window.location.href = filmeLink.href;
    })
    filmeLink.appendChild(div);
    return filmeLink;
}
