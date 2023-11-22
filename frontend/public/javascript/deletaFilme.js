onload = function () {
    document.getElementById("deleteButton").addEventListener("click", function (evento) {
        evento.preventDefault();
        var urlParams = new URLSearchParams(window.location.search);
        var slug = urlParams.get('slug');
        var token = localStorage.getItem("token");

        fetch(backendAddress + 'filmes/' + slug + '/delete' , {
            method: "DELETE",
            headers: {
                'Authorization': tokenKeyword + token 
            }
        })
        .then(function (response) {
            return response.json();
        }).then(function (data) {
            if (data.success === "Filme excluído!") {
                window.location.replace("index.html");
            }
        })
    }
    )
}