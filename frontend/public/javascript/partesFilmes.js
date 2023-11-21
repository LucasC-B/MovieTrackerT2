onload = function () {
    exibeListaDeFilmes();
};

function criaElementosFilmes(filme) {
    var filmeDiv = document.createElement('div');
    filmeDiv.className = 'card m-auto text-bg-dark';

    var cardBody = document.createElement('div');
    cardBody.className = 'card-body my-2';

    var filmeTitle = document.createElement('p');
    filmeTitle.className = 'card-title';
    filmeTitle.textContent = "Filme: ".concat(filme.titulo, "    Data de lançamento: ").concat(filme.ano);

    var nacionalidade = document.createElement('h2');
    nacionalidade.className = 'card-nacionalidade';
    nacionalidade.textContent = filme.nacionalidade;

    var sinopse = document.createElement('pre');
    sinopse.className = 'card-text text-bg-dark';
    sinopse.textContent = filme.sinopse;

    cardBody.appendChild(filmeTitle);
    cardBody.appendChild(nacionalidade);
    cardBody.appendChild(sinopse);

    filmeDiv.appendChild(cardBody);
    return filmeDiv;
}

function exibeListaDeFilmes() {
    fetch(backendAddress + "filmes/list")
        .then(function (response) { 
            return response.json(); })
        .then(function (Filmes) {
            var filmeList = document.getElementById("filmeList");
            filmeList.innerHTML = '';
            Filmes.results.forEach(function (filme) {
            var filmeElement = criaElementosFilmes(filme);
            filmeList.appendChild(filmeElement);
        }); 
    })
        .catch(function (error) {
        console.error("Erro:", error);
    });
}
