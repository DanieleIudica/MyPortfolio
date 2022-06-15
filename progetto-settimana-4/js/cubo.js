// calcola cubo
let bottone = document.querySelector("button");
let totale = document.getElementById("totale");
let numero = document.querySelector("input");

function cubo(a) {
  let risultato = a * a * a;
  console.log(risultato);
  return risultato;
}
bottone.addEventListener("click", () => {
  totale.innerHTML = cubo(numero.value);
});
