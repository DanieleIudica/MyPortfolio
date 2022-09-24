// prova recupero bulbasaur da pokeAPI tramite fetch
// fetch("https://pokeapi.co/api/v2/pokemon/1") //url del pokemon
//   .then((response) => response.json()) // ritorno in formato Json
//   .then((data) => {
//     console.log(data); // clg del file recuperato
//     console.log(data["name"]); // clg nome pokemon
//   });

//!  seleziono tutti gli elementi del DOM che mi servono
const mainScreen = document.querySelector(".main-screen");
const pokeName = document.querySelector(".poke-name");
const pokeId = document.querySelector(".poke-id");
const pokeFrontImage = document.querySelector(".poke-front-image");
const pokeBackImage = document.querySelector(".poke-back-image");
const pokeTypeOne = document.querySelector(".poke-type-one");
const pokeTypeTwo = document.querySelector(".poke-type-two");
const pokeWeight = document.querySelector(".poke-weight");
const pokeHeight = document.querySelector(".poke-height");
const pokeListItems = document.querySelectorAll(".list-item");
const leftButton = document.querySelector(".left-button");
const rightButton = document.querySelector(".right-button");

// console.log(pokeListItems); // prendo tutti i div con querySelectorAll

// array dei pokemon types che corrispondono alle classi css
const TYPES = [
    "normal",
    "fighting",
    "flying",
    "poison",
    "ground",
    "rock",
    "bug",
    "ghost",
    "steel",
    "fire",
    "water",
    "grass",
    "electric",
    "psychic",
    "ice",
    "dragon",
    "dark",
    "fairy",
];

// previous url & next url
let prevUrl = null;
let nextUrl = null;

// !funzioni
// funzione capitalize, rende maiuscolo il carattere 0 e concatena la stringa in minuscolo
// si puo anche fare con     text-transform: capitalize;     in css
const capitalize = (str) => str[0].toUpperCase() + str.substr(1);

// funzione per resettare il colore dello screen
const resetScreen = () => {
    mainScreen.classList.remove("hide"); //accendo lo screen
    // for of dell array per iterare tutte le classi/type
    for (const i of TYPES) {
        //   ed eliminare qualunqhe sia la classe del poke visualizzato in precedenza
        mainScreen.classList.remove(i);
        // console.log(i);
    }
};

//! fetch che recupera dati per il lato destro dello schermo
//   gli passo url come parametro
const fetchPokeList = (url) => {
    fetch(url) // al posto che avere un url fissa, gli passo un url variabile tramite parametro. per navigare con prev e next
        .then((response) => response.json())
        .then((data) => {
            // console.log(data);
            //   mi restituisce un array con i primi 20 poke
            // const results = data["results"]; // quando vuoi dare alla variabile lo stesso nome della proprieta' come in questo caso, puoi destrutturizzare in questo modo
            const { results, previous, next } = data;
            prevUrl = previous;
            nextUrl = next;
            console.log(next);

            console.log(results);
            for (let i = 0; i < pokeListItems.length; i++) {
                const pokeListItem = pokeListItems[i];
                //   console.log(pokeListItem);
                const resultData = results[i];
                //   console.log(resultData);

                // se esiste carica i dati
                if (resultData) {
                    const { name, url } = resultData;
                    const urlArray = url.split("/"); // creo un arrai splittando gli elementi da '/'
                    //console.log(urlArray[6]); //il sesto elemento e' il numero che ci serve
                    const id = urlArray[6];
                    pokeListItem.textContent = `${id}.  ${capitalize(name)}`;
                    // altrimenti, stringa vuota
                } else {
                    pokeListItem.textContent = "";
                }
            }
        });
};

//! fetch che recupera dati per il lato sinistro dello schermo
const fetchPokeData = (pokeNum) =>
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokeNum}`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            // reset schermo
            resetScreen();
            // types
            const dataTypes = data["types"]; // recupero array del tipo
            const dataFirstType = dataTypes[0]; // li divido perche non tutti i pokemon hanno 2 tipi
            const dataSecondType = dataTypes[1]; // bisognera' creare un if
            pokeTypeOne.textContent = capitalize(dataFirstType["type"]["name"]); // recupero nome primo tipo
            if (dataSecondType) {
                pokeTypeTwo.classList.remove("hide"); // se esiste la rimuove
                pokeTypeTwo.textContent = capitalize(dataSecondType["type"]["name"]); // se esiste recupero nome secondo tipo (if mi da un boolean)
            } else {
                pokeTypeTwo.classList.add("hide"); // nascondo lo span nel caso il poke non abbia il secondType
                pokeTypeTwo.textContent = ""; // svuoto il campo altrimenti andando al poke successivo continuero' a visualizzare il vecchio type
            }
            mainScreen.classList.add(dataFirstType["type"]["name"]); // va ad aggiungere il type come classe che corrisponde al bg color associato nel css!
            pokeName.textContent = capitalize(data["name"]); // recupero delle singole info
            pokeId.textContent = "#" + data["id"].toString().padStart(3, "0"); // converto in stringa e uso padStart per fare in modo che abbia 3 caratteri, se piu corta verranno rimpiazzati da 0
            pokeWeight.textContent = data["weight"];
            pokeHeight.textContent = data["height"];

            // imgs
            pokeFrontImage.src = data["sprites"]["front_default"] || ""; // || stringa vuota in caso non dovesse trovare l'img
            pokeBackImage.src = data["sprites"]["back_default"] || "";
        });

//! bottoni prev & next
const rightButtonClick = () => {
    if (nextUrl) {
        fetchPokeList(nextUrl);
    }
};

const leftButtonClick = () => {
    if (prevUrl) {
        fetchPokeList(prevUrl);
    }
};
// !bottoni pokeList
const listItemClick = (e) => {
    // console.log(e.target.textContent); //seleziona il contenuto del singolo bottone
    if (!e.target) return; // se il target non esiste, non fare nulla
    const listItem = e.target;
    if (!listItem.textContent) return; // se il target contiene una stringa vuota (ultima pagina poke, non fare nulla)
    const textArray = listItem.textContent.split("."); //creo un array della stringa divisa da '.' in modo da recuperare il numero
    const pokeNum = textArray[0];
    fetchPokeData(pokeNum);
};

// aggiungo gli event listeners
leftButton.addEventListener("click", leftButtonClick);
rightButton.addEventListener("click", rightButtonClick);
// bottoni pokeList, creazione di un eventlistener per ogni item con un for of
for (const pokeListItem of pokeListItems) {
    pokeListItem.addEventListener("click", listItemClick);
}

// inizializzo lo schermo a destra
fetchPokeList("https://pokeapi.co/api/v2/pokemon?offset=0&limit=20");
