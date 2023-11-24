import { usuarioAutorizaPromise } from './autenticacao';

document.addEventListener('DOMContentLoaded', () => {
    usuarioAutorizaPromise.then(({ usuarioAutoriza }) => {
        usuario_autenticado(usuarioAutoriza);
    });
});

function usuario_autenticado(usuarioAutoriza: string | undefined) {
    const urlParams = new URLSearchParams(window.location.search);
    const slug = urlParams.get('slug');
    const antesDoHifen = slug?.split("-")[0];

    if (antesDoHifen === usuarioAutoriza) {
        deletaFilme(slug);
    } else {
        window.location.replace("index.html");
    }
}

function deletaFilme(slug: string | null) {
    const deleteButton = document.getElementById("deleteButton");

    if (deleteButton) {
        deleteButton.addEventListener("click", (evento) => {
            evento.preventDefault();

            const token = localStorage.getItem("token");

            if (slug) {
                fetch(backendAddress + 'filmes/' + slug + '/delete', {
                    method: "DELETE",
                    headers: {
                        'Authorization': tokenKeyword + token,
                    },
                })
                    .then((response) => response.json())
                    .then((data) => {
                        console.log(data);
                        if (data.success === "Filme excluído com sucesso!") {
                            window.location.replace("index.html");
                        }
                    });
            }
        });
    }
}
