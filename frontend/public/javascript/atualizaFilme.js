document.addEventListener('DOMContentLoaded', function () {
    var urlParams = new URLSearchParams(window.location.search);
    var slug = urlParams.get('slug');
    
    fetch(backendAddress + 'filmes/' + slug + '/', {
        method: 'GET',
    })
        .then(function (response) {
            response.json().then(function (filme) {
                document.getElementById("titulo").value = filme.titulo;
                document.getElementById("nacionalidade").value = filme.nacionalidade;
                document.getElementById("ano").value = filme.ano;
                document.getElementById("sinopse").value = filme.sinopse;
                document.getElementById("diretor").value = filme.diretor;
                document.getElementById("nota").value = filme.nota;
                document.getElementById("review").value = filme.review;
                document.getElementById("visto").value = filme.visto;
            }).catch(function (error) {
                console.error("Erro:", error);
            });
        });
});

document.addEventListener("DOMContentLoaded", function () {
    var btnSalvaFilme = document.getElementById("btnSalvaFilme");
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
});