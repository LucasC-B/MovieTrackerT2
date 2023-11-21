window.addEventListener('load', function () {
    var token = localStorage.getItem('token');
    fetch(backendAddress + 'usuarios/login', {
        method: 'GET',
        headers: {
            'Authorization': tokenKeyword + token
        }
    })
        .then(function (response) {
            response.json().then(function (data) {
                var usuario = data;
                if (response.ok) {
                    console.log('Usuário autenticado:', usuario.username);

                    var objDiv = document.getElementById('logado');
                    objDiv.classList.remove('invisivel');  
                    objDiv.classList.add('visivel');  
                    objDiv = document.getElementById('deslogado');
                    objDiv.classList.remove('visivel');  
                    objDiv.classList.add('invisivel');  
                }
                else {
                    console.log('Usuário não autenticado. Usando nome de usuário padrão.');

                    usuario.username = ' Visitante';
                    var objDiv = document.getElementById('deslogado');
                    objDiv.classList.remove('invisivel');  
                    objDiv.classList.add('visivel');  
                    objDiv = document.getElementById('logado');
                    objDiv.classList.remove('visivel');  
                    objDiv.classList.add('invisivel');  
                }

                var spanElement = document.getElementById('id');
                spanElement.innerHTML = usuario.username;
            });
        })
        .catch(function (erro) {
            console.log('[setLoggedUser] ocorreu o erro: ' + erro);
        });
});
