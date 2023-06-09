const emAlta = document.getElementById('emAlta');

let dadosLidos;

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

function ProdutosEMALTA() {
    let texto = '<div class="textoEMALTA"><h1>EM ALTA!!!</h1></div>';
    const limiteCaracteres = 40;

    for (let i = 0; (i < dadosLidos.length) && (i < 30); i++) {
        let titulo = dadosLidos[i].title;
        if (titulo.length > limiteCaracteres) {
            titulo = titulo.substring(0, limiteCaracteres) + '...';
        }

        texto += `  <div class="card">
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
                    </div>`;
    }
    emAlta.innerHTML = texto;
}

const inputBox = document.getElementById("input-box");
const goSearchButton = document.getElementById("gosearch");
const cleanSearchButton = document.getElementById("cleansearch");

inputBox.onkeyup = function() {
    let input = inputBox.value.trim().toLowerCase();
    cleanSearchButton.style.display = input.length ? "inline-block" : "none";
}

function algoescrito(){
    let input = inputBox.value.trim().toLowerCase();
    cleanSearchButton.style.display = input.length ? "inline-block" : "none";
    resultsBox.innerHTML = '';
}

cleanSearchButton.onclick = function() {
    inputBox.value = "";
    cleanSearchButton.style.display = "none";
}
