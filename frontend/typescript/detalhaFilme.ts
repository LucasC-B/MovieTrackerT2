import { usuarioAutorizaPromise } from "./autenticacao";

interface Filme {
    titulo: string;
    nacionalidade: string;
    ano: number;
    sinopse: string;
    diretor: string;
    nota: number;
    review: string;
    visto: boolean;
    usuario: string;
    slug: string;
}

document.addEventListener('DOMContentLoaded', () => {
    usuarioAutorizaPromise.then(({ usuarioAutoriza }) => {
        exibeDetalhesFilme(usuarioAutoriza);
    });
});

function exibeDetalhesFilme(usuarioAutoriza: string) {
    const urlParams = new URLSearchParams(window.location.search);
    const slug = urlParams.get('slug');

    fetch(backendAddress + 'filmes/' + slug + '/', {
        method: 'GET',
    })
        .then((response) => {
            response.json().then((filme: Filme) => {
                console.log(filme);
                const Filme = document.getElementById("filme");
                Filme.innerHTML = '';
                const detalhesFilme = desenhaDetalhesFilme(filme, usuarioAutoriza);
                Filme.appendChild(detalhesFilme);

            }).catch((error) => {
                console.error("Erro:", error);
            });
        });
}

function desenhaDetalhesFilme(filme: Filme, usuarioAutoriza: string): HTMLDivElement {
    const div = document.createElement('div');
    div.className = 'card m-auto mt-4 text-bg-dark';
    div.style.width = '900px';

    const cardDetail = document.createElement('div');
    cardDetail.className = 'card-body my-2';
    div.appendChild(cardDetail);

    const tituloFilme = document.createElement('p');
    tituloFilme.className = 'card-text';
    tituloFilme.innerHTML = 'Título do filme: ' + filme.titulo;
    cardDetail.appendChild(tituloFilme);

    const nacionalideFilme = document.createElement('p');
    nacionalideFilme.className = 'card-text';
    nacionalideFilme.innerHTML = 'Nacionalidade do filme: ' + filme.nacionalidade;
    cardDetail.appendChild(nacionalideFilme);

    const anoFilme = document.createElement('p');
    anoFilme.className = 'card-text';
    anoFilme.innerHTML = 'Ano de lançamento do filme: ' + filme.ano;
    cardDetail.appendChild(anoFilme);

    const sinopseFilme = document.createElement('p');
    sinopseFilme.className = 'card-text';
    sinopseFilme.innerHTML = 'Sinopse do filme: ' + filme.sinopse;
    cardDetail.appendChild(sinopseFilme);

    const diretorFilme = document.createElement('p');
    diretorFilme.className = 'card-text';
    diretorFilme.innerHTML = 'Diretor do filme: ' + filme.diretor;
    cardDetail.appendChild(diretorFilme);

    const notaFilme = document.createElement('p');
    notaFilme.className = 'card-text';
    notaFilme.innerHTML = 'Nota do filme: ' + filme.nota;
    cardDetail.appendChild(notaFilme);

    const reviewFilme = document.createElement('p');
    reviewFilme.className = 'card-text';
    reviewFilme.innerHTML = 'Review do filme: ' + filme.review;
    cardDetail.appendChild(reviewFilme);

    const vistoFilme = document.createElement('p');
    vistoFilme.className = 'card-text';
    vistoFilme.innerHTML = 'Visto pelo usuário: ' + filme.visto;
    cardDetail.appendChild(vistoFilme);

    const hr = document.createElement('hr');
    cardDetail.appendChild(hr);

    const modFilme = document.createElement('div');
    modFilme.className = 'd-flex justify-content-end mx-2';
    cardDetail.appendChild(modFilme);

    if (filme.usuario === usuarioAutoriza) {
        const linkAtualiza = document.createElement('a');
        linkAtualiza.className = 'btn btn-warning mx-2';
        linkAtualiza.href = 'atualizaFilme.html?slug=' + filme.slug;
        linkAtualiza.innerHTML = '<i class="bi bi-pencil"></i> Editar';
        modFilme.appendChild(linkAtualiza);

        const linkDeleta = document.createElement('a');
        linkDeleta.className = 'btn btn-danger';
        linkDeleta.href = 'deletaFilme.html?slug=' + filme.slug;
        linkDeleta.innerHTML = '<i class="bi bi-trash"></i> Deletar';
        modFilme.appendChild(linkDeleta);
    }

    return div;
}
