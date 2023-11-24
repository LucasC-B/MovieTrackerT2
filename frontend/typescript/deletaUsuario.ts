document.addEventListener("DOMContentLoaded", () => {
    const btnDeleteAccount = document.getElementById("btnDeleteAccount") as HTMLButtonElement | null;

    if (btnDeleteAccount) {
        btnDeleteAccount.addEventListener("click", (event) => {
            event.preventDefault();

            const emailInput = document.getElementById("email") as HTMLInputElement | null;
            const passwordInput = document.getElementById("password") as HTMLInputElement | null;
            const msg = document.getElementById("msg") as HTMLElement;

            if (emailInput && passwordInput) {
                const email = emailInput.value;
                const password = passwordInput.value;

                const token = localStorage.getItem('token');
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
                    .then((response) => {
                        if (!response.ok) {
                            throw new Error('Erro na requisição');
                        }
                        return response.json();
                    })
                    .then((data) => {
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
                    .catch((error) => {
                        console.log(error);
                    });
            }
        });
    }
});
