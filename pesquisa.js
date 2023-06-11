let urlParams = new URLSearchParams(window.location.search);
const strpesquisa = urlParams.get('pesquisa');

let dadosLidos;
let produtosEncontrados = [];

leDados()
  .then(() => {
    encontraProdutos();
  })
  .catch(error => {
    console.error(error);
  });

function leDados() {
  return fetch('https://fakestoreapi.com/products')
    .then(res => res.json())
    .then(json => {
      dadosLidos = json;
    });
}

function encontraProdutos() {
  const pesquisaLowerCase = strpesquisa.toLowerCase();

  for (let i = 0; i < dadosLidos.length; i++) {
    const produto = dadosLidos[i];
    const { title, description } = produto;

    if (
      title.toLowerCase().includes(pesquisaLowerCase) ||
      description.toLowerCase().includes(pesquisaLowerCase)
    ) {
      produtosEncontrados.push(produto);
    }
  }

  MostrarProdutos();
}

function MostrarProdutos() {
  let tela = document.getElementById('encontrados');
  let strHTML = '<h1>Produtos encontrados:</h1>';
  const limiteCaracteres = 40;

  for (let i = 0; i < produtosEncontrados.length && i < 10; i++) {
    let titulo = produtosEncontrados[i].title;
    if (titulo.length > limiteCaracteres) {
      titulo = titulo.substring(0, limiteCaracteres) + '...';
    }

    strHTML += `<a href="more.html?id=${produtosEncontrados[i].id}">
                  <div class="card">
                    <div class="cardIMG">
                      <img src="${produtosEncontrados[i].image}">
                    </div>
                    <div class="texto">
                      <h1 class="cardTEXT">
                        ${titulo}
                      </h1>
                    </div>
                    <div class="preco">
                      <h2>
                        R$ ${produtosEncontrados[i].price}
                      </h2>
                    </div>
                  </div>
                </a>`;
  }

  tela.innerHTML = strHTML;
}

/** 
    Funções para barra de pesquisa da página
*/

// Definição de variaveis para a barra de pesquisa
const inputBox = document.getElementById("input-box"); // barra de pesquisa
const goSearchButton = document.getElementById("gosearch"); // botao de pesquisa
const cleanSearchButton = document.getElementById("cleansearch"); // botao de limpar a barra
const goHomeButton = document.getElementById("gohome"); // botao de pesquisa

// funcao para colocar o "x" na tela quando algo for escrito na barra de pesquisa
inputBox.onkeyup = function () {
    algoescrito();
    // coloca o "x" na tela
}

// funcao para colocar o "x" na tela
function algoescrito() {
    let input = inputBox.value;
    // le o que esta na barra de pesquisa
    cleanSearchButton.style.display = input.length ? "inline-block" : "none";
    // Coloca o "x" na tela caso tenha algo na barra de pesquisa
}

// Funcao para limpar a caixa e retirar o "x" quando ele for pressionado
cleanSearchButton.onclick = function () {
    inputBox.value = "";
    // limpa a inputbox
    cleanSearchButton.style.display = "none";
    // Tira o "x" da tela
}

// Funcao para limpar a caixa e retirar o "x" quando ele for pressionado
goSearchButton.onclick = function () {
    if (inputBox.value != "") {
        window.location.assign(`pesquisa.html?pesquisa=${inputBox.value}`);
    }
}

// Funcao para voltar para a página home
goHomeButton.onclick = function () {
  window.location.assign(`index.html`);
}