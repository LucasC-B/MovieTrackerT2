window.addEventListener('load', (evento) => {
    const token = localStorage.getItem('token');

    fetch(backendAddress + 'usuarios/logout', {
        method: 'DELETE',
        headers: {
            'Authorization': tokenKeyword + token,
            'Content-Type': 'application/json'
        }
    })
    .then((response) => {
        const mensagem = document.getElementById('mensagem');

        if (response.ok) {
            window.location.assign('index.html');
            if (mensagem) {
                mensagem.innerHTML = 'Logout bem sucedido!';
            }
        } else {
            if (mensagem) {
                mensagem.innerHTML = 'Erro ' + response.status;
            }
        }
    })
    .catch((erro) => {
        console.log(erro);
    });
});
