document.addEventListener("DOMContentLoaded", function () {
    var btnDeleteAccount = document.getElementById("btnDeleteAccount");
    if (btnDeleteAccount) {
        btnDeleteAccount.addEventListener("click", function (event) {
            event.preventDefault();
            var email = document.getElementById("email").value;
            var password = document.getElementById("password").value;
            var msg = document.getElementById("msg");

            var token = localStorage.getItem('token');
            fetch(backendAddress + "usuarios/properties/delete-usuario", {
                method: "POST",
                headers: {
                    'Authorization': tokenKeyword + token,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
            })
                .then(function (response) {
                    if (!response.ok) {
                        throw new Error('Erro na requisição');
                    }
                    return response.json();
                })
                .then(function (data) {
                    console.log(data);
                    if (data && data.response === "Conta foi apagada.") {
                        msg.innerHTML = "Conta deletada com sucesso!";
                        window.location.assign('index.html');
                    } else if (data.error) {
                        msg.innerHTML = data.error;
                    } else {
                        throw new Error("Falha na deleção da conta!");
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        });
    }
});
