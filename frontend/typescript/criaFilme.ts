import { usuarioAutorizaPromise } from './autenticacao';

document.addEventListener('DOMContentLoaded', () => {
    usuarioAutorizaPromise
        .then(({ usuarioAutoriza, response }: { usuarioAutoriza: string; response: Response }) => {
            if (response.ok) {
                criaFilme();
            } else {
                window.location.replace('index.html');
            }
        })
        .catch((error: Error) => {
            console.error('Error durante autenticacao:', error);
        });
});

function criaFilme() {
    const btnPost = document.getElementById('btnPost') as HTMLButtonElement | null;

    if (btnPost) {
        btnPost.addEventListener('click', (event) => {
            event.preventDefault();
            const titulo = (document.getElementById('titulo') as HTMLInputElement).value;
            const nacionalidade = (document.getElementById('nacionalidade') as HTMLInputElement).value;
            const ano = (document.getElementById('ano') as HTMLInputElement).value;
            const sinopse = (document.getElementById('sinopse') as HTMLInputElement).value;
            const diretor = (document.getElementById('diretor') as HTMLInputElement).value;
            const nota = (document.getElementById('nota') as HTMLInputElement).value;
            const review = (document.getElementById('review') as HTMLInputElement).value;
            const visto = (document.getElementById('visto') as HTMLInputElement).value;

            const msg = document.getElementById('msg') as HTMLElement;
            const token = localStorage.getItem('token');

            const formData = new FormData();
            formData.append('titulo', titulo);
            formData.append('nacionalidade', nacionalidade);
            formData.append('ano', ano);
            formData.append('sinopse', sinopse);
            formData.append('diretor', diretor);
            formData.append('nota', nota);
            formData.append('review', review);
            formData.append('visto', visto);

            fetch(backendAddress + 'filmes/create', {
                method: 'POST',
                headers: {
                    'Authorization': tokenKeyword + token,
                },
                body: formData,
            })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                if (data.response === 'Filme foi criado!') {
                    window.location.replace('index.html');
                } else {
                    throw new Error('Falha na atualização');
                }
            })
            .catch((error) => {
                console.log(error);
                msg.innerHTML = 'Erro durante criação do filme. Tente novamente.';
            });
        });
    }
}
