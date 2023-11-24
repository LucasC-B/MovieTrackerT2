let usuarioAutoriza;

let usuarioAutorizaPromise = new Promise((resolve, reject) => {
    fetch(backendAddress + 'usuarios/login', {
        method: 'GET',
        headers: {
            'Authorization': tokenKeyword + localStorage.getItem('token')
        }
    })
    .then(function (response) {
        response.json().then(function (data) {
            usuarioAutoriza = data.username;
            resolve({ usuarioAutoriza, response });
        });
    })
    .catch(erro => {
        console.log('[setLoggedUser] ocorreu um erro: ' + erro);
        reject(erro);
    });
});

export { usuarioAutorizaPromise };

