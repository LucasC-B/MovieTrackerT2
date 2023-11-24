let usuarioAutoriza;

let usuarioAutorizaPromise = new Promise((resolve, reject) => {
    window.addEventListener('load', function () {
        var token = localStorage.getItem('token');
        fetch(backendAddress + 'usuarios/login', {
            method: 'GET',
            headers: {
                'Authorization': tokenKeyword + token
            }
        })
        .then(function (response){
            response.json().then(function(data) {
                usuarioAutoriza = data.username;
                resolve({usuarioAutoriza, response});
            });
        })
        .catch(erro => {
            console.log('[setLoggedUser] ocorreu o erro: ' + erro);
            reject(erro);
        });
    });
});

export { usuarioAutorizaPromise };

