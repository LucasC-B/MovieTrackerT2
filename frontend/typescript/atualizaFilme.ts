import { usuarioAutorizaPromise } from './autenticacao.js';

document.addEventListener('DOMContentLoaded', function () {
    usuarioAutorizaPromise
        .then(({ usuarioAutoriza }) => {
            const urlParams = new URLSearchParams(window.location.search);
            const slug = urlParams.get('slug');

            if (slug && slug.split("-")[0] === usuarioAutoriza) {
                atualizaFilme(slug);
            } else {
                window.location.replace("index.html");
            }
        })
        .catch(error => {
            console.error("Error durante autenticacao:", error);
        });
});

function atualizaFilme(slug: string) {
    const backendAddress = 'sua-url-do-backend/'; // Substitua com o endereço real do seu backend
    const tokenKeyword = 'Bearer '; // Substitua com a palavra-chave real do seu token, se necessário

    fetch(backendAddress + 'filmes/' + slug + '/', {
        method: 'GET',
    })
    .then(response => response.json())
    .then(filme => {
        document.getElementById("titulo").value = filme.titulo;
        document.getElementById("nacionalidade").value = filme.nacionalidade;
        document.getElementById("ano").value = filme.ano;
        document.getElementById("sinopse").value = filme.sinopse;
        document.getElementById("diretor").value = filme.diretor;
        document.getElementById("nota").value = filme.nota;
        document.getElementById("review").value = filme.review;
        document.getElementById("visto").value = filme.visto;
    })
    .catch(error => {
        console.error("Error:", error);
    });

    const btnSalvaFilme = document.getElementById("btnSalvaFilme");

    if (btnSalvaFilme) {
        btnSalvaFilme.addEventListener("click", function (event) {
            event.preventDefault();

            var nTitulo = document.getElementById("titulo").value
            var nNacionalidade = document.getElementById("nacionalidade").value
            var nAno = document.getElementById("ano").value
            var nSinopse = document.getElementById("sinopse").value
            var nDiretor = document.getElementById("diretor").value
            var nNota = document.getElementById("nota").value
            var nReview = document.getElementById("review").value
            var nVisto = document.getElementById("visto").value

            const msg = document.getElementById("msg");

            var urlParams = new URLSearchParams(window.location.search);
            var slug = urlParams.get('slug');

            var token = localStorage.getItem('token');

            var formData = new FormData();
            formData.append("titulo", nTitulo);
            formData.append("nacionalidade", nNacionalidade);
            formData.append("ano", nAno);
            formData.append("sinopse", nSinopse);
            formData.append("diretor", nDiretor);
            formData.append("nota", nNota);
            formData.append("review", nReview);
            formData.append("visto", nVisto);
        
            fetch(backendAddress + "filmes/" + slug + "/update", {
                method: "PUT",
                headers: {
                    'Authorization': tokenKeyword + token,
                },
                body: formData,
            })
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                if(data.response === "Filme atualizado!") {
                    window.location.replace("index.html");
                }
                if (data.titulo && data.titulo.length > 1) {
                    msg.innerHTML = 'Titulo inválido!';
                } else {
                    throw new Error("Falha na atualização do filme");
                }
            })
            .catch(function (error) {
                console.log(error);
                msg.innerHTML = "Erro durante a atualização do filme. Por favor, tente novamente.";
            });
        });
    }
}
