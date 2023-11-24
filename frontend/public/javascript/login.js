import { usuarioAutorizaPromise } from './autenticacao.js';

document.addEventListener('DOMContentLoaded', function () {
    usuarioAutorizaPromise.then(usuarioAutoriza => {
        usuario_autenticado(usuarioAutoriza.usuarioAutoriza);
        
    });
});

function usuario_autenticado(usuarioAutoriza){
    if (usuarioAutoriza === 'visitante') {
        login();
    } else {
        window.location.replace("index.html");
    }
}

function login(){
    document.getElementById("btnLogin").addEventListener("click", function (evento) {
        evento.preventDefault();
        var username = document.getElementById("username").value;
        var password = document.getElementById("password").value;
        var msg = document.getElementById("msg");
        
        console.log(backendAddress + "usuarios/login");
        fetch(backendAddress + "usuarios/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: username,
                password: password,
            }),
        })
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            if (data.response == "Autentificação bem sucedida!") {
                var token = data.token;
                localStorage.setItem("token", token);
                window.location.replace("index.html");
            } else {
                throw new Error("Erro na autenticação!");
            }
        })
        .catch(function (error) {
            console.log(error);
            msg.innerHTML = "Erro durante o login. Por favor, tente novamente!";
        });
    });
}