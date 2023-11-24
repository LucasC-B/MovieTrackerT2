import { usuarioAutorizaPromise } from "./autenticacao.js";

document.addEventListener('DOMContentLoaded', function () {
    usuarioAutorizaPromise.then(usuarioAutoriza => {
        exibeDetalhesFilme(usuarioAutoriza.usuarioAutoriza);
    });
});

function exibeDetalhesFilme(usuarioAutoriza) {
    var urlParams = new URLSearchParams(window.location.search);
    var slug = urlParams.get('slug');

    fetch(backendAddress + 'filmes/' + slug + '/', {
        method: 'GET',
    })
        .then(function (response) {
            response.json().then(function (filme) {
                console.log(filme);
                var Filme = document.getElementById("filme");
                Filme.innerHTML = '';
                var detalhesFilme = desenhaDetalhesFilme(filme, usuarioAutoriza);
                Filme.appendChild(detalhesFilme);

            }).catch(function (error) {
                console.error("Erro:", error);
            });
        });
};


function desenhaDetalhesFilme(filme, usuarioAutoriza) {

    var div = document.createElement('div');
    div.className = 'card m-auto mt-4 text-bg-dark';
    div.style.width = '900px';

    var cardDetail = document.createElement('div');
    cardDetail.className = 'card-body my-2';
    div.appendChild(cardDetail);

    var tituloFilme = document.createElement('p');
    tituloFilme.className = 'card-text';
    tituloFilme.innerHTML = 'Título do filme: '+ filme.titulo;
    cardDetail.appendChild(tituloFilme);

    var nacionalideFilme = document.createElement('p');
    nacionalideFilme.className = 'card-text';
    nacionalideFilme.innerHTML = 'Nacionalidade do filme: ' + filme.nacionalidade;
    cardDetail.appendChild(nacionalideFilme);

    var anoFilme = document.createElement('p');
    anoFilme.className = 'card-text';
    anoFilme.innerHTML = 'Ano de lançamento do filme: ' + filme.ano;
    cardDetail.appendChild(anoFilme);

    var sinopseFilme = document.createElement('p');
    sinopseFilme.className = 'card-text';
    sinopseFilme.innerHTML = 'Sinopse do filme: ' + filme.sinopse;
    cardDetail.appendChild(sinopseFilme);
    
    var diretorFilme = document.createElement('p');
    diretorFilme.className = 'card-text';
    diretorFilme.innerHTML = 'Diretor do filme: ' + filme.diretor;
    cardDetail.appendChild(diretorFilme);

    var notaFilme = document.createElement('p');
    notaFilme.className = 'card-text';
    notaFilme.innerHTML = 'Nota do filme: ' + filme.nota;
    cardDetail .appendChild(notaFilme);

    var reviewFilme = document.createElement('p');
    reviewFilme.className = 'card-text';
    reviewFilme.innerHTML = 'Review do filme: ' + filme.review;
    cardDetail.appendChild(reviewFilme);    

    var vistoFilme = document.createElement('p');
    vistoFilme.className = 'card-text';
    vistoFilme.innerHTML = 'Visto pelo usuário: ' + filme.visto;
    cardDetail.appendChild(vistoFilme);

    var hr = document.createElement('hr');
    cardDetail.appendChild(hr);

    var modFilme = document.createElement('div');
    modFilme.className = 'd-flex justify-content-end mx-2';
    cardDetail.appendChild(modFilme);

    if (filme.usuario == usuarioAutoriza) {
        var linkAtualiza = document.createElement('a');
        linkAtualiza.className = 'btn btn-warning mx-2';
        linkAtualiza.href = 'atualizaFilme.html?slug=' + filme.slug;
        linkAtualiza.innerHTML = '<i class="bi bi-pencil"></i> Editar';
        modFilme.appendChild(linkAtualiza);
        
        var linkDeleta = document.createElement('a');
        linkDeleta.className = 'btn btn-danger';
        linkDeleta.href = 'deletaFilme.html?slug=' + filme.slug;
        linkDeleta.innerHTML = '<i class="bi bi-trash"></i> Deletar';
        modFilme.appendChild(linkDeleta);
    }

    return div;
}
