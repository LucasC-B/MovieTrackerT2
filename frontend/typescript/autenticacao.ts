let usuarioAutoriza: string | undefined;

interface UsuarioAutorizaResponse {
    usuarioAutoriza: string;
    response: Response;
}

const usuarioAutorizaPromise: Promise<UsuarioAutorizaResponse> = new Promise((resolve, reject) => {
    fetch(backendAddress + 'usuarios/login', {
        method: 'GET',
        headers: {
            'Authorization': tokenKeyword + localStorage.getItem('token')
        }
    })
    .then((response) => {
        response.json().then((data) => {
            usuarioAutoriza = data.username;
            resolve({ usuarioAutoriza, response });
        });
    })
    .catch((erro) => {
        console.log('[setLoggedUser] ocorreu um erro: ' + erro);
        reject(erro);
    });
});

export { usuarioAutorizaPromise };
