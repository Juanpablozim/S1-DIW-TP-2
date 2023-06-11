// Define divs a serem escritas
const emAlta = document.getElementById('emAlta');

// declara variavel de leitura de dados
let dadosLidos;
let categoriasLidas;
let ProdutosCategoriasLidas;
let categoriaAtual;

/** 
    Funções para leitura e escrita de dados da Fake Store API
*/

/*
    LEITURA DADOS GERAIS
*/
leDados().then(() => {
    ProdutosEMALTA();
}).catch(error => {
    console.error(error);
});

function leDados() {
    return fetch('https://fakestoreapi.com/products')
        .then(res => res.json())
        .then(data => {
            dadosLidos = data;
        });
}

/*
    ESCRITA DADOS GERAIS
*/
function ProdutosEMALTA() {
    //let texto = '<div class="textoEMALTA"><h1>EM ALTA!!!</h1></div>';
    let texto = '';
    const limiteCaracteres = 40;

    for (let i = 0; (i < dadosLidos.length) && (i < 30); i++) {
        let titulo = dadosLidos[i].title;
        if (titulo.length > limiteCaracteres) {
            titulo = titulo.substring(0, limiteCaracteres) + '...';
        }

        texto += `  <a href="more.html?id=${dadosLidos[i].id}"><div class="card">
                        <div class="cardIMG">
                            <img src="${dadosLidos[i].image}">
                        </div>
                        <div class="texto">
                            <h1 class="cardTEXT">
                                ${titulo}
                            </h1>
                        </div>
                        <div class="preco">
                            <h2>
                                R$ ${dadosLidos[i].price}
                            </h2>
                        </div>
                    </div></a>`;
    }
    emAlta.innerHTML = texto;
}

/*
    LEITURA DADOS CATEGORIAS
*/
leCategorias()
    .then(() => {
        BuscaCategorias();
        addCategoriaChangeListeners(); // Adiciona os ouvintes de mudança nas categorias
        return leProdutosCategorias(); // Chama leProdutosCategorias após a leitura das categorias
    })
    .then(() => {
        BuscaProdutosCategorias();
    })
    .catch(error => {
        console.error(error);
    });

function leCategorias() {
    return fetch('https://fakestoreapi.com/products/categories')
        .then(res => res.json())
        .then(data => {
            categoriasLidas = data;
        });
}

function BuscaCategorias() {
    let tela = document.getElementById('opcoesCategories');
    let strHTML = '';

    for (let i = 0; i < categoriasLidas.length; i++) {
        if (i == 0) {
            strHTML += `<div class="combinacaoCategories">
            <input type="radio" id="${categoriasLidas[i]}" name="tipoCategoria" checked><label for="${categoriasLidas[i]}">${categoriasLidas[i]}</label>
            </div>`;
        } else {
            strHTML += `<div class="combinacaoCategories">
            <input type="radio" id="${categoriasLidas[i]}" name="tipoCategoria"><label for="${categoriasLidas[i]}">${categoriasLidas[i]}</label>
    </div>`;
        }
    }

    tela.innerHTML = strHTML;
}

function leProdutosCategorias() {
    let strCategories = '';

    // Verifica qual opção está marcada
    for (let i = 0; i < categoriasLidas.length; i++) {
        if (document.getElementById(categoriasLidas[i]).checked) {
            strCategories = categoriasLidas[i];
        }
    }

    return fetch(`https://fakestoreapi.com/products/category/${strCategories}`)
        .then(res => res.json())
        .then(data => {
            ProdutosCategoriasLidas = data;
        });
}

function BuscaProdutosCategorias() {
    let tela = document.getElementById('produtosCategories');
    let strHTML = '';
    const limiteCaracteres = 40;

    for (let i = 0; (i < ProdutosCategoriasLidas.length) && (i < 10); i++) {
        let titulo = ProdutosCategoriasLidas[i].title;
        if (titulo.length > limiteCaracteres) {
            titulo = titulo.substring(0, limiteCaracteres) + '...';
        }

        strHTML += `  <a href="more.html?id=${dadosLidos[i].id}"><div class="card">
                        <div class="cardIMG">
                            <img src="${ProdutosCategoriasLidas[i].image}">
                        </div>
                        <div class="texto">
                            <h1 class="cardTEXT">
                                ${titulo}
                            </h1>
                        </div>
                        <div class="preco">
                            <h2>
                                R$ ${ProdutosCategoriasLidas[i].price}
                            </h2>
                        </div>
                    </div></a>`;
    }

    tela.innerHTML = strHTML;
}

function addCategoriaChangeListeners() {
    for (let i = 0; i < categoriasLidas.length; i++) {
        let categoria = categoriasLidas[i];
        let element = document.getElementById(categoria);
        element.addEventListener('change', () => {
            // Quando houver uma mudança na opção de categoria selecionada
            leProdutosCategorias()
                .then(() => {
                    // Chama a função para carregar os produtos da categoria atualizada
                    BuscaProdutosCategorias();
                    // Exibe os produtos atualizados na tela
                })
                .catch(error => {
                    console.error(error);
                });
        });
    }
}


/** 
    Funções para barra de pesquisa da página
*/

// Definição de variaveis para a barra de pesquisa
const inputBox = document.getElementById("input-box"); // barra de pesquisa
const goSearchButton = document.getElementById("gosearch"); // botao de pesquisa
const cleanSearchButton = document.getElementById("cleansearch"); // botao de limpar a barra

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


/*
    FUNCAO FORMULARIO CONTATO
*/
function enviarDados() {
    document.getElementById('enviado').innerHTML = '<div class="enviado">Parabéns!<br>Agora você estará por dentro de tudo de melhor que a The Best Store tem para te oferecer</div>';
    document.getElementById('contatoEmail').value = '';
    document.getElementById('contatoNumero').value = '';
}

document.getElementById('btnFormContato').addEventListener('click', enviarDados);