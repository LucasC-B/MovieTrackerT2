document.addEventListener("DOMContentLoaded", () => {
    const btnRegister = document.getElementById("btnRegister");

    if (btnRegister) {
        btnRegister.addEventListener("click", (event) => {
            event.preventDefault();
            
            const email = (document.getElementById("email") as HTMLInputElement)?.value;
            const username = (document.getElementById("username") as HTMLInputElement)?.value;
            const password1 = (document.getElementById("password1") as HTMLInputElement)?.value;
            const password2 = (document.getElementById("password2") as HTMLInputElement)?.value;
            const msg = document.getElementById("msg");

            if (msg) {
                msg.innerHTML = '';
            }

            fetch(backendAddress + "usuarios/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email,
                    username: username,
                    password: password1,
                    password2: password2,
                }),
            })
            .then((response) => response.json())
            .then((data) => {
                if (data.response === "Registro bem sucedido!") {
                    const token = data.token;
                    localStorage.setItem("token", token);
                    window.location.replace("index.html");
                } else if (data.email) {
                    if (msg) {
                        msg.innerHTML = data.email;
                    }
                } else if (data.username) {
                    if (msg) {
                        msg.innerHTML = data.username;
                    }
                } else if (data.password) {
                    if (msg) {
                        msg.innerHTML = data.password;
                    }
                } else {
                    throw new Error("Erro ao registrar!");
                }
            })
            .catch((error) => {
                console.log(error);
                if (msg) {
                    msg.innerHTML = "Erro durante o registro. Tente novamente.";
                }
            });
        });
    }
});
