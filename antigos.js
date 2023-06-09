let availableKeywords = [];

const resultsBox = document.querySelector(".result-box");
const inputBox = document.getElementById("input-box");
const goSearchButton = document.getElementById("gosearch");
const cleanSearchButton = document.getElementById("cleansearch");

function leDados() {
    return fetch('https://fakestoreapi.com/products')
        .then(res => res.json())
        .then(data => {
            return JSON.parse(data);
        });
}

async function loadKeywords() {
    try {
        availableKeywords = await leDados();
        console.log(availableKeywords);
        inputBox.removeAttribute("disabled");
    } catch (error) {
        console.log('Erro ao carregar os dados:', error);
    }
}

loadKeywords();

inputBox.onkeyup = function () {
    let result = [];
    let input = inputBox.value.trim().toLowerCase();

    if (input.length) {
        result = availableKeywords.filter((item) => {
            return item.id.toString().includes(input) ||
                item.title.toLowerCase().includes(input) ||
                item.price.toString().includes(input) ||
                item.category.toLowerCase().includes(input) ||
                item.description.toLowerCase().includes(input);
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
        return "<li onclick='selectInput(this)' data-id='" + item.id + "'>" + item.title + ", R$" + item.price + "</li>";
    });

    resultsBox.innerHTML = "<ul>" + content.join('') + "</ul>";
}

function selectInput(list) {
    /*
    inputBox.value = list.innerHTML;
    const id = list.getAttribute("data-id");
    window.location = "moreinfo.html?id=" + id;
    */

    window.location = "index.html/products";
}

function cleansearchbar() {
    inputBox.value = '';
    algoescrito();
}