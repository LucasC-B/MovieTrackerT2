document.addEventListener("DOMContentLoaded", function () {
    const btnRegister = document.getElementById("btnRegister");

    if (btnRegister) {
        btnRegister.addEventListener("click", function (event) {
            event.preventDefault();
            const email = document.getElementById("email").value;
            const username = document.getElementById("username").value;
            const password1 = document.getElementById("password1").value;
            const password2 = document.getElementById("password2").value;
            const msg = document.getElementById("msg");

            msg.innerHTML = '';
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
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    if (data.email && data.email.length > 0) {
                        msg.innerHTML = data.email[0];
                    } else if (data.username && data.username.length > 0) {
                        msg.innerHTML = data.username[0];
                    } else if (data.response === "Usuário registrado com sucesso!") {
                        var token = data.token;
                        localStorage.setItem("token", token);
                        window.location.replace("index.html");
                    } else {
                        throw new Error("Falha no registro");
                    }
                })
                .catch(function (error) {
                    console.log(error);
                    msg.innerHTML = "Erro durante o registro. Tente novamente.";
                });
        });
    }
});
