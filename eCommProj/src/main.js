let shop = document.querySelector("#shop");

// se non abbiamo dati nel localstorage il basket sara` un array vuoto
let basket = JSON.parse(localStorage.getItem("data")) || [];

let generateShop = () => {
  return (shop.innerHTML = shopItemsData
    .map((x) => {
      let { id, prod_name, prod_des, prod_price, prod_url } = x;
      // prende il dato solo se presente nel local storage, altrimenti []
      let search = basket.find((x) => x.id === id) || [];
      return `
    <div id='prodId${id}' class="item">
    <img width="220" src="${prod_url}" alt="" />
    <div class="details">
      <h3>${prod_name}</h3>
      <p>${prod_des}</p>
      <div class="price-quantity">
        <h2>${prod_price} €</h2>
        <div class="buttons">
          <i onclick="decrement(${id})" class="bi bi-dash-circle"></i>
          <div id=${id} class="quantity">${search.item === undefined ? 0 : search.item}</div>
          <i onclick="increment(${id})" class="bi bi-plus-circle"></i>
        </div>
      </div>
    </div>
    </div>`;
    })
    .join(""));
};

generateShop();

let increment = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem.id);

  //? se nel basket l`id cercato non e` presente eseguo il push
  if (search === undefined) {
    basket.push({
      id: selectedItem.id,
      item: 1,
    });
  }
  //? altrimenti incremento solo il num dell`item
  else {
    search.item += 1;
  }
  // console.log(selectedItem.id);
  // console.log(basket);
  //? passo alla funzione l`id
  update(selectedItem.id);
  // ? local storage
  localStorage.setItem("data", JSON.stringify(basket));
};

let decrement = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem.id);

  if (!search) return;
  //? se item = 0 return
  else if (search.item === 0) {
    return;
  }
  //? altrimenti decremento il num dell`item
  else {
    search.item -= 1;
  }
  // console.log(selectedItem.id);
  // console.log(basket);
  update(selectedItem.id);
  //? filtro il basket per eliminare gli oggetti con item = a 0
  basket = basket.filter((x) => x.item !== 0);
  // ? set local storage
  localStorage.setItem("data", JSON.stringify(basket));
};

let update = (id) => {
  //? se l`id e` presente nel basket
  let search = basket.find((x) => x.id === id);
  // console.log(search.item);
  document.getElementById(id).innerHTML = search.item;
  //? richiamo la funzione calculation ad ogni update
  calculation();
};

let calculation = () => {
  let cartIcon = document.querySelector(".cartAmount");
  //? uso map per ottenere un array con il numero dei singoli item nel basket e reduce per sommarli
  cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};

// invoco la funzione ad ogni caricamento della pagina in modo che si aggiorni da subito il totale degli items del local storage
calculation();
