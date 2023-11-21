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
                    "Content-Type": "application/json",
                    'Authorization': tokenKeyword + token,
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
            })
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    if (data && data.response === "Conta deletada!") {
                        msg.innerHTML = "Conta deletada com sucesso!";
                        window.location.assign('index.html');
                    } else if (data.response) {
                        msg.innerHTML = data.response;
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
