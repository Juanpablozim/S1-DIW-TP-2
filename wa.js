function leDados() {
    let strDados = localStorage.getItem('db');
    let objDados = {};

    if (strDados) {
        objDados = JSON.parse(strDados);
    } else {
        objDados = {
            pontos: [
                {
                    id: 1,
                    rua: "Av. Dom José Gaspar",
                    numero: "500",
                    bairro: "Coração Eucarístico",
                    cidade: "Belo Horizonte",
                    uf: "MG",
                    more: "Assalto",
                    tipo: "Ponto"
                },
                {
                    id: 2,
                    rua: "Av. Princesa Isabel",
                    numero: "1290",
                    bairro: "Copacabana",
                    cidade: "Contagem",
                    uf: "MG",
                    more: "Poste estragado",
                    tipo: "Ponto"
                },
                {
                    id: 3,
                    rua: "R. Bandeiras",
                    numero: "53",
                    bairro: "Sao Joaquim",
                    cidade: "Sao Paulo",
                    uf: "SP",
                    more: "Ermo",
                    tipo: "Local"
                }
            ]
        };
    }

    return objDados.pontos;
}

let availableKeywords = leDados();

const resultsBox = document.querySelector(".result-box");
const inputBox = document.getElementById("input-box");
const goSearchButton = document.getElementById("gosearch");
const cleanSearchButton = document.getElementById("cleansearch");

inputBox.onkeyup = function () {
    let result = [];
    let input = inputBox.value.trim().toLowerCase();

    if (input.length) {
        result = availableKeywords.filter((item) => {
            return item.id.toString().includes(input) ||
                item.rua.toLowerCase().includes(input) ||
                item.bairro.toLowerCase().includes(input) ||
                item.cidade.toLowerCase().includes(input) ||
                item.uf.toLowerCase().includes(input) ||
                item.more.toLowerCase().includes(input) ||
                item.tipo.toLowerCase().includes(input);
        });
    }

    display(result);

    if (!result.length) {
        resultsBox.innerHTML = '';
    }

    goSearchButton.style.display = input.length ? "none" : "block";
    cleanSearchButton.style.display = input.length ? "block" : "none";
};

function algoescrito() {
    let input = inputBox.value.trim().toLowerCase();
    goSearchButton.style.display = input.length ? "none" : "block";
    cleanSearchButton.style.display = input.length ? "block" : "none";
    resultsBox.innerHTML = '';
}


function display(result) {
    const content = result.map((item) => {
        return "<li onclick='selectInput(this)' data-id='" + item.id + "'>" + item.rua + ", " + item.bairro + ", " + item.cidade + ", " + item.uf + "</li>";
    });

    resultsBox.innerHTML = "<ul>" + content.join('') + "</ul>";
}

function selectInput(list) {
    inputBox.value = list.innerHTML;
    const id = list.getAttribute("data-id");
    window.location = "moreinfo.html?id=" + id;
}

function cleansearchbar() {
    inputBox.value = '';
    algoescrito()
}

document.getElementById('btnclean').addEventListener('click', cleansearchbar);