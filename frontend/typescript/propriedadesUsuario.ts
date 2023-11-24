window.addEventListener('load', (evento) => {
    const token = localStorage.getItem('token');
    
    fetch(backendAddress + 'usuarios/properties', {
        method: 'GET',
        headers: {
            'Authorization': tokenKeyword + token,
        },
    })
    .then((response) => {
        response.json().then((data) => {
            const objDivUsername = document.getElementById('username') as HTMLInputElement;
            if (objDivUsername) {
                objDivUsername.value = data.username;
            }
            
            const objDivEmail = document.getElementById('email') as HTMLInputElement;
            if (objDivEmail) {
                objDivEmail.value = data.email;
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const btnSaveChanges = document.getElementById('btnSaveChanges');
    
    if (btnSaveChanges) {
        btnSaveChanges.addEventListener('click', (event) => {
            event.preventDefault();
            
            const novoEmail = (document.getElementById('email') as HTMLInputElement)?.value;
            const novoUsername = (document.getElementById('username') as HTMLInputElement)?.value;
            const msg = document.getElementById('msg');
            const token = localStorage.getItem('token');

            fetch(backendAddress + 'usuarios/properties/update', {
                method: 'PUT',
                headers: {
                    'Authorization': tokenKeyword + token,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: novoEmail,
                    username: novoUsername,
                }),
            })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);

                if (data.email && data.email.length > 0) {
                    if (msg) {
                        msg.innerHTML = data.email[0];
                    }
                } else if (data.username && data.username.length > 0) {
                    if (msg) {
                        msg.innerHTML = data.username[0];
                    }
                } else if (data.response === 'Conta atuliazada com sucesso!') {
                    if (msg) {
                        msg.innerHTML = 'Atualização bem-sucedida!';
                    }
                } else {
                    throw new Error('Falha na atualização!');
                }
            })
            .catch((error) => {
                console.log(error);

                if (msg) {
                    msg.innerHTML = 'Erro durante a atualização. Por favor, tente novamente!';
                }
            });
        });
    }
});
