import { usuarioAutorizaPromise } from './autenticacao';

document.addEventListener('DOMContentLoaded', () => {
    usuarioAutorizaPromise.then(({ usuarioAutoriza }) => {
        usuario_autenticado(usuarioAutoriza);
    });
});

function usuario_autenticado(usuarioAutoriza: string) {
    if (usuarioAutoriza === 'visitante') {
        login();
    } else {
        window.location.replace("index.html");
    }
}

function login() {
    document.getElementById("btnLogin")?.addEventListener("click", (evento) => {
        evento.preventDefault();
        const username = (document.getElementById("username") as HTMLInputElement)?.value;
        const password = (document.getElementById("password") as HTMLInputElement)?.value;
        const msg = document.getElementById("msg");

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
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                if (data.response == "Autentificação bem sucedida!") {
                    const token = data.token;
                    localStorage.setItem("token", token);
                    window.location.replace("index.html");
                } else {
                    throw new Error("Erro na autenticação!");
                }
            })
            .catch((error) => {
                console.log(error);
                if (msg) {
                    msg.innerHTML = "Erro durante o login. Por favor, tente novamente!";
                }
            });
    });
}
