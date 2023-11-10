onload = function () {
    exibeListaDeFilmes();
}

function exibeListaDeFilmes() {
    fetch(backendAddress + "filmes/list/")
      .then((response) => response.json())
      .then((filmes) => {
        let campos = [
          "titulo",
          "nacionalidade",
          "ano",
          "sinopse",
          "diretor",
          "nota",
          "review",
          "visto",
        ];

        let tbody = document.getElementById("idtbody") as HTMLTableSectionElement;
        tbody.innerHTML = "";
        
        for (let filme of filmes) {
          let tr = document.createElement("tr") as HTMLTableRowElement;
          for (let i = 0; i < campos.length; i++) {
            let td = document.createElement("td") as HTMLTableCellElement;
            let texto = document.createTextNode(filme[campos[i]]) as Text;
            td.appendChild(texto);
            tr.appendChild(td);
          }
          tbody.appendChild(tr);
        }
      })
      .catch((error) => {
        console.error("Erro:", error);
      });
  }