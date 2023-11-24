import { usuarioAutorizaPromise } from './autenticacao.js';

document.addEventListener('DOMContentLoaded', function () {
    usuarioAutorizaPromise.then(usuarioAutoriza => {
        usuario_autenticado(usuarioAutoriza.usuarioAutoriza);
    });
});

function usuario_autenticado(usuarioAutoriza) {
    var urlParams = new URLSearchParams(window.location.search);
    var slug = urlParams.get('slug');
    const antesDoHifen = slug.split("-")[0];
    if (antesDoHifen === usuarioAutoriza) {
        deletaFilme(slug);
    }else {
        window.location.replace("index.html");
    }
}

function deletaFilme(slug) {
    document.getElementById("deleteButton").addEventListener("click", function (evento) {
        evento.preventDefault();
        
        var token = localStorage.getItem("token");

        fetch(backendAddress + 'filmes/' + slug + '/delete' , {
            method: "DELETE",
            headers: {
                'Authorization': tokenKeyword + token 
            }
        })
        .then(function (response) {
            return response.json();
        }).then(function (data) {
            console.log(data);
            if (data.success === "Filme excluído com sucesso!") {
                window.location.replace("index.html");
            }
        })
    })
}