import { usuarioAutorizaPromise } from './autenticacao';

usuarioAutorizaPromise.then(({ usuarioAutoriza, response }) => {
    logadoOuVisitante(response, usuarioAutoriza);
});

function logadoOuVisitante(response: Response, usuario: string) {
    if (response.ok) {
        console.log('Usuário autenticado:', usuario);

        const logadoDiv = document.getElementById('logado');
        if (logadoDiv) {
            logadoDiv.classList.remove('invisivel');
            logadoDiv.classList.add('visivel');
        }

        const deslogadoDiv = document.getElementById('deslogado');
        if (deslogadoDiv) {
            deslogadoDiv.classList.remove('visivel');
            deslogadoDiv.classList.add('invisivel');
        }
    } else {
        console.log('Usuário não autenticado. Usando nome de usuário padrão.');

        usuario = ' Visitante';

        const deslogadoDiv = document.getElementById('deslogado');
        if (deslogadoDiv) {
            deslogadoDiv.classList.remove('invisivel');
            deslogadoDiv.classList.add('visivel');
        }

        const logadoDiv = document.getElementById('logado');
        if (logadoDiv) {
            logadoDiv.classList.remove('visivel');
            logadoDiv.classList.add('invisivel');
        }
    }

    const spanElement = document.getElementById('id');
    if (spanElement) {
        spanElement.innerHTML = usuario;
    }
}
