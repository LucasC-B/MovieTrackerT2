document.addEventListener('DOMContentLoaded', () => {
    fetch(backendAddress + 'filmes/list', {
        method: 'GET',
    }).then((response) => {
        response.json().then((filmeListing: FilmeListing) => {
            const filmeList = document.getElementById("filmeList");

            if (filmeList) {
                filmeList.innerHTML = '';
                filmeListing.results.reverse();

                filmeListing.results.forEach((filme) => {
                    const filmeDetail = criaListaFilmes(filme);
                    if (filmeList) {
                        filmeList.appendChild(filmeDetail);
                    }
                });
            }
        }).catch((error) => {
            console.error("Erro:", error);
        });
    });
});

interface Filme {
    titulo: string;
    ano: number;
    review: string;
    nota: number;
    usuario: string;
    slug: string;
}

interface FilmeListing {
    results: Filme[];
}

function criaListaFilmes(filme: Filme): HTMLAnchorElement {
    const div = document.createElement('div');
    div.className = 'card m-auto text-bg-dark mb-3';

    const cardDetail = document.createElement('div');
    cardDetail.className = 'card-body my-2';
    div.appendChild(cardDetail);

    const headerFilme = document.createElement('p');
    headerFilme.className = 'card-text';
    headerFilme.textContent = "Filme: " + filme.titulo;
    cardDetail.appendChild(headerFilme);

    const anoFilme = document.createElement('p');
    anoFilme.className = 'card-text';
    anoFilme.textContent = "Ano: " + filme.ano;
    cardDetail.appendChild(anoFilme);

    const hr = document.createElement('hr');
    cardDetail.appendChild(hr);

    const reviewFilme = document.createElement('pre');
    reviewFilme.className = 'card-text text-bg-dark';
    reviewFilme.textContent = filme.review;
    cardDetail.appendChild(reviewFilme);

    const notaFilme = document.createElement('h3');
    notaFilme.className = 'card-text';
    notaFilme.textContent = 'Nota: ' + filme.nota;
    cardDetail.appendChild(notaFilme);

    const hr1 = document.createElement('hr');
    cardDetail.appendChild(hr1);

    const footerFilme = document.createElement('div');
    footerFilme.className = 'card-footer text-muted text-bg-dark';
    footerFilme.textContent = "Postado por: " + filme.usuario;

    div.appendChild(cardDetail);
    div.appendChild(footerFilme);

    const filmeLink = document.createElement('a');
    filmeLink.style.textDecoration = "none !important";
    filmeLink.className = "link-dark";
    filmeLink.href = 'detalhaFilme.html?slug=' + filme.slug;

    filmeLink.addEventListener('click', (event) => {
        event.preventDefault();
        window.location.href = filmeLink.href;
    });

    filmeLink.appendChild(div);
    return filmeLink;
}
