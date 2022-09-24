// variabili pagina todo
const taskInput = document.querySelector("#input");
const inputButton = document.querySelector("#button");
const taskList = document.querySelector("#task-list");
//
document.addEventListener("DOMContentLoaded", function () {
    // if (document.location.pathname === "/index.html") {
    if (document.location.pathname === "danieleiudica.github.io/MyPortfolio/todoapp//index.html") {
        let jsonTask = localStorage.getItem("localTask");
        console.log(jsonTask);
        if (jsonTask !== null) {
            let prova = JSON.parse(jsonTask); //se il local storage non e' vuoto
            console.log(prova);
            taskList.innerHTML = prova; // caricane il contenuto nella pagina
        }
        inputButton.addEventListener("click", aggiungiTask);
        taskList.addEventListener("click", rimuoviTask);
        logout.addEventListener("click", slogga);
    } else if (
        document.location.pathname === "danieleiudica.github.io/MyPortfolio/todoapp/login.html"
    ) {
        // } else if (document.location.pathname === "/login.html") {
        login.addEventListener("click", check);
    }
});

// pagina login
const email = document.querySelector(".email");
const pw = document.querySelector(".pw");
const login = document.querySelector(".login");
const error = document.querySelector(".error");

function check() {
    console.log(email.value);
    if (email.value === "" || email.value === null) {
        error.innerHTML = `<p>Inserisci una mail.</p>`;
    } else if (pw.value === "" || pw.value === null) {
        error.innerHTML = `<p>Inserisci una password.</p>`;
    } else if (!validateEmail(email.value)) {
        error.innerHTML = `<p>inserire una mail valida.</p>`;
    } else if (pw.value.length < 8) {
        error.innerHTML = `<p>La password deve avere almeno 8 caratteri.</p>`;
    } else {
        login.setAttribute("href", "index.html");
    }
}
const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};
//
// pagina todo
function aggiungiTask(e) {
    if (taskInput.value === "") {
        error.innerHTML = `<p>Inserisci un impegno!</p>`;
    } else {
        error.innerHTML = ``;
        taskList.innerHTML += `<li class='rimuovi'>  ${taskInput.value} <i class="bi bi-check-square-fill"></i></li>`;
        localStorage.setItem("localTask", JSON.stringify(taskList.innerHTML));
        console.log(localStorage);
    }
    taskInput.value = "";
    e.preventDefault();
}

function rimuoviTask(e) {
    if (e.target.classList.contains("bi")) {
        e.target.parentElement.remove();
        localStorage.setItem("localTask", JSON.stringify(taskList.innerHTML));
        // console.log(localStorage);
    }
}

// logout
const logout = document.querySelector(".logout");

function slogga() {
    localStorage.clear();
}
