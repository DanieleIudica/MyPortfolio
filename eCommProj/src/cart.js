let label = document.querySelector(".label");
let shoppingCart = document.querySelector(".shopping-cart");

// riporto il basket e la funzione calculation in modo da aggiornare il cartAmount
let basket = JSON.parse(localStorage.getItem("data")) || [];
let calculation = () => {
  let cartIcon = document.querySelector(".cartAmount");
  //? uso map per ottenere un array con il numero dei singoli item nel basket e reduce per sommarli
  cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};

// invoco la funzione ad ogni caricamento della pagina in modo che si aggiorni da subito il totale degli items del local storage
calculation();

let generateCartItems = () => {
  if (basket.length !== 0) {
    return (shoppingCart.innerHTML = basket
      .map((x) => {
        // destrutturo  il basket
        let { id, item } = x;
        // cerco un match tra id nel basket e id nel data.js
        let search = shopItemsData.find((y) => y.id === id) || [];
        return `
        <div class="cart-item">
            <img width="150" src="${search.prod_url}" alt="" />
            <div class="details">
                <div class="title-price-x">
                    <h3>${search.prod_name}</h3>
                    <p>${search.prod_price} €</p>                    
                    <i onclick='removeItem(${id})' class="bi bi-trash3-fill"></i>
                </div>
                <div class="buttons cartBtns">
                    <i onclick="decrement(${id})" class="bi bi-dash-circle"></i>
                    <div id=${id} class="quantity">${item}</div>
                    <i onclick="increment(${id})" class="bi bi-plus-circle"></i>
                </div>

                <h3>${item * search.prod_price} €</h3>
            </div>
        </div>
        `;
      })
      .join(""));
  } else {
    label.innerHTML = `<h2>The cart is Empty.</h2>
    <a href="index.html"><button class="homeBtn">Back to Home</button></a>`;
    shoppingCart.innerHTML = "";
  }
};

generateCartItems();

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
  //? rigenero il basket ogni volta che rimuovo un item, in modo che si aggiorni il prezzo totale
  generateCartItems();

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
  //? rigenero il basket ogni volta che rimuovo un item, in modo che si aggiorni il prezzo totale e quando arrivo a 0 il prodotto viene cancellato
  generateCartItems();

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
  //   ? aggiorno total amount
  totalAmount();
};

let removeItem = (id) => {
  // ? seleziono per id
  let selectedItem = id;
  //   console.log(selectedItem.id);
  // ? filter mi restituisce un array senza l`item corrispondente all`id cliccato
  basket = basket.filter((x) => x.id !== selectedItem.id);
  // ? aggiorno il local storage
  localStorage.setItem("data", JSON.stringify(basket));
  // ? rigenero il carrello
  generateCartItems();
  //   ? aggiorno total amount
  totalAmount();
  calculation();
};

let totalAmount = () => {
  if (basket.length !== 0) {
    let amount = basket
      .map((x) => {
        let { id, item } = x;
        // cerco un match tra id nel basket e id nel data.js
        let search = shopItemsData.find((y) => y.id === id) || [];
        return item * search.prod_price;
        // ? questa funzione ritorna un array con i totali parziali
      })
      //? uso reduce per calcolare il totale complessivo
      .reduce((x, y) => x + y, 0);
    // console.log(amount);
    label.innerHTML = `<h2>Total bill: ${amount} €</h2>
        <button class="checkOut">
          <a class="green"href="https://danieleiudica.github.io/MyPortfolio/progetto-settimana-4">Checkout</a>
        </button>
        <button onclick='showModal()' class="clearCart">Clear Cart</button>
        `;
  } else return;
};

totalAmount();

let clearCart = () => {
  hideModal();
  basket = [];
  // ? rigenero il carrello
  generateCartItems();
  calculation();
  localStorage.clear();
};

// show modal
let showModal = () => {
  let modal = document.querySelector(".modal");
  modal.classList.add("show");
};

let hideModal = () => {
  let modal = document.querySelector(".modal");
  modal.classList.remove("show");
};
