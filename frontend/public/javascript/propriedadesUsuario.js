window.addEventListener('load', function (evento) {
    var token = localStorage.getItem('token');
    fetch(backendAddress + 'usuarios/properties', {
        method: 'GET',
        headers: {
            'Authorization': tokenKeyword + token,
        },
        
    }).then(function (response) {
        response.json().then(function (data) {
            var objDivUsername = document.getElementById('username');
            objDivUsername.value = data.username;
            var objDivEmail = document.getElementById('email');
            objDivEmail.value = data.email;
        });
    });
});



document.addEventListener("DOMContentLoaded", function () {
    var btnSaveChanges = document.getElementById("btnSaveChanges");
    if (btnSaveChanges) {
        btnSaveChanges.addEventListener("click", function (event) {
            event.preventDefault();
            var novoEmail = document.getElementById("email").value;
            var novoUsername = document.getElementById("username").value;
            const msg = document.getElementById("msg");
            var token = localStorage.getItem('token');

            fetch(backendAddress + "usuarios/properties/update", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': tokenKeyword + token,
                },
                body: JSON.stringify({
                    email: novoEmail,
                    username: novoUsername,
                }),
            })
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    if (data.email && data.email.length > 0) {
                        msg.innerHTML = data.email[0];
                    }
                    else if (data.username && data.username.length > 0) {
                        msg.innerHTML = data.username[0];
                    }
                    else if (data.response === "Conta atualizada com sucesso!") {
                        msg.innerHTML = "Atualização bem-sucedida!";
                    }
                    else {
                        throw new Error("Falha na atualização!");
                    }
                })
                .catch(function (error) {
                    console.log(error);
                    msg.innerHTML = "Erro durante a atualização. Por favor, tente novamente!";
                });
        });
    }
});
