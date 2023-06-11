/*
    Leitura de id por parâmetro
*/
let urlParams = new URLSearchParams(window.location.search);
// le parametros da url
const idrecebido = parseInt(urlParams.get('id'));
// pega parametro id


/*
    LEITURA DADOS DO PRODUTO
*/
const tela = document.getElementById('corpo');
const ltitulo = document.getElementById('nomeProduto');
const lpreco = document.getElementById('precoProduto');
const limg = document.getElementById('imgProduto');
const lcategoria = document.getElementById('categoriaProduto');
const ldescricao = document.getElementById('descricaoProduto');
const lavaliacao = document.getElementById('avaliacaoProduto');
const lnumeroavaliacoesProduto = document.getElementById('numeroavaliacoesProduto');
const estrelasProduto = document.getElementById('estrelasProduto');
let dadosLidos;

leDados().then(() => {
    escreveDadosProduto();
}).catch(error => {
    console.error(error);
});

function leDados() {
    return fetch(`https://fakestoreapi.com/products/${idrecebido}`)
        .then(res => res.json())
        .then(data => {
            dadosLidos = data;
        });
}

function escreveDadosProduto() {
    let contador = 0;

    //let texto = '<div class="textoEMALTA"><h1>EM ALTA!!!</h1></div>';
    ltitulo.innerHTML    = `${dadosLidos.title}`;
    lpreco.innerHTML     = `R$ ${dadosLidos.price}`;
    limg.innerHTML       = `<img class="imgProduto" src="${dadosLidos.image}">`;
    lcategoria.innerHTML = `${dadosLidos.category}`;
    ldescricao.innerHTML = `${dadosLidos.description}`;
    for (let i = 1; i <= dadosLidos.rating.rate; i++) {
        estrelasProduto.innerHTML += `<i class="fa-solid fa-star"></i>`;
      }
      
      for (let i = dadosLidos.rating.rate; i <= 5; i++) {
        estrelasProduto.innerHTML += `<i class="fa-regular fa-star"></i>`;
      }
    lavaliacao.innerHTML = `Avaliação: ${dadosLidos.rating.rate}`;
    lnumeroavaliacoesProduto.innerHTML = `Número de avaliações: ${dadosLidos.rating.count}`;
}

/*
    FUNCAO FORMULARIO CONTATO
*/
function realizarCOMPRA () {
    document.getElementById('enviar').innerHTML = '<div class="enviar">COMPRA REALIZADA!</div>';
}

document.getElementById('BuyBTN').addEventListener('click', realizarCOMPRA  );

/** 
    Funções para barra de pesquisa da página
*/

// Definição de variaveis para a barra de pesquisa
const inputBox = document.getElementById("input-box"); // barra de pesquisa
const goSearchButton = document.getElementById("gosearch"); // botao de pesquisa
const cleanSearchButton = document.getElementById("cleansearch"); // botao de limpar a barra
const goHomeButton = document.getElementById("gohome"); // botao home

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