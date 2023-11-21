window.addEventListener('load', function (evento) {
    var token = localStorage.getItem('token');
    fetch(backendAddress + 'usuarios/logout', {
        method: 'DELETE',
        headers: {
            'Authorization': tokenKeyword + token,
            'Content-Type': 'application/json'
        }
    })
        .then(function (response) {
            var mensagem = document.getElementById('mensagem');
            if (response.ok) {
                window.location.assign('index.html');
                mensagem.innerHTML = 'Logout bem sucedido!';
            }
            else {
                mensagem.innerHTML = 'Erro ' + response.status;
            }
        })
        .catch(function (erro) {
            console.log(erro);
        });
});
