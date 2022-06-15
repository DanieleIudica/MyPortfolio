var val = document.getElementById("schermo");

function cancel() {
  val.value = "";
}
function exe() {
  val.value = eval(val.value).toFixed(2);
}
function del() {
  val.value = val.value.substr(0, val.value.length - 1);
}

// ho inserito qualche if e else per impedire che si possa
// iniziare a scrivere digitando tanti ".", "+", "*", ecc.

function add(v) {
  if (val.value == ".") {
    val.value = "";
  } else if (val.value == "*") {
    val.value = "";
  } else if (val.value == "/") {
    val.value = "";
  } else if (val.value == "+") {
    val.value = "";
  } else if (val.value == "00") {
    val.value = "";
  } else if (val.value == "--") {
    val.value = "";
  } else {
    val.value += v;
  }
}
