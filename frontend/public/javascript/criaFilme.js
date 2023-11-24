import { usuarioAutorizaPromise } from './autenticacao.js';

document.addEventListener('DOMContentLoaded', function () {
    usuarioAutorizaPromise
        .then(({ usuarioAutoriza, response }) => {
            if (response.ok) {
                criaFilme();
            } else {
                window.location.replace("index.html");
            }
        })
        .catch(error => {
            console.error("Error durante autenticacao:", error);
        });
});

function criaFilme() {
    const btnPost = document.getElementById("btnPost");
    if (btnPost) {
        btnPost.addEventListener("click", function (event) {
            event.preventDefault();
            var titulo = document.getElementById("titulo").value;
            var nacionalidade = document.getElementById("nacionalidade").value;
            var ano = document.getElementById("ano").value;
            var sinopse = document.getElementById("sinopse").value;
            var diretor = document.getElementById("diretor").value;
            var nota = document.getElementById("nota").value;
            var review = document.getElementById("review").value;
            var visto = document.getElementById("visto").value;

            var msg = document.getElementById("msg");
            var token = localStorage.getItem('token');

            var formData = new FormData();
            formData.append('titulo', titulo);
            formData.append('nacionalidade', nacionalidade);
            formData.append('ano', ano);
            formData.append('sinopse', sinopse);
            formData.append('diretor', diretor);
            formData.append('nota', nota);
            formData.append('review', review);
            formData.append('visto', visto);

            fetch(backendAddress + "filmes/create", {
                method: "POST",
                headers: {
                    'Authorization': tokenKeyword + token,
                },
                body: formData,
            })
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                if (data.response == "Filme criado!") {
                    window.location.replace("index.html");
                }
                else {
                    throw new Error("Falha na atualização");
                }
            })
            .catch(function (error) {
                console.log(error);
                msg.innerHTML = "Erro durante criaçao do filme. Tente novamente.";
            });
        });
    }
}
// document.addEventListener("DOMContentLoaded", function () {
//     document.getElementById("btnPost").addEventListener("click", function (event) {
//         event.preventDefault();
//         var titulo = document.getElementById("titulo").value;
//         var nacionalidade = document.getElementById("nacionalidade").value;
//         var ano = document.getElementById("ano").value;
//         var sinopse = document.getElementById("sinopse").value;
//         var diretor = document.getElementById("diretor").value;
//         var nota = document.getElementById("nota").value;
//         var review = document.getElementById("review").value;
//         var visto = document.getElementById("visto").value;

//         var msg = document.getElementById("msg");

//         var token = localStorage.getItem('token');
        
//         var formData = new FormData();
//         formData.append('titulo', titulo);
//         formData.append('nacionalidade', nacionalidade);
//         formData.append('ano', ano);
//         formData.append('sinopse', sinopse);
//         formData.append('diretor', diretor);
//         formData.append('nota', nota);
//         formData.append('review', review);
//         formData.append('visto', visto);

//         fetch(backendAddress + "filmes/create", {
//             method: "POST",
//             headers: {
//                 'Authorization': tokenKeyword + token,
//             },
//             body: formData,
//         })
//         .then(function (response) {
//             return response.json();
//         })
//         .then(function (data) {
//             if (data.response == "Filme criado!") {
//                 window.location.replace("index.html");
//             }
//             else {
//                 throw new Error("Falha na atualização");
//             }
//         })
//         .catch(function (error) {
//             console.log(error);
//             msg.innerHTML = "Erro durante criaçao do filme. Tente novamente.";
//         });
//     });
// });