// Items a livello locale
const menu = [
  {
    id: 1,
    title: "buttermilk pancakes",
    category: "breakfast",
    price: 15.99,
    img: "./images/item-1.jpeg",
    desc: `I'm baby woke mlkshk wolf bitters live-edge blue bottle, hammock freegan copper mug whatever cold-pressed `,
  },
  {
    id: 2,
    title: "diner double",
    category: "lunch",
    price: 13.99,
    img: "./images/item-2.jpeg",
    desc: `vaporware iPhone mumblecore selvage raw denim slow-carb leggings gochujang helvetica man braid jianbing. Marfa thundercats `,
  },
  {
    id: 3,
    title: "godzilla milkshake",
    category: "shakes",
    price: 6.99,
    img: "./images/item-3.jpeg",
    desc: `ombucha chillwave fanny pack 3 wolf moon street art photo booth before they sold out organic viral.`,
  },
  {
    id: 4,
    title: "country delight",
    category: "breakfast",
    price: 20.99,
    img: "./images/item-4.jpeg",
    desc: `Shabby chic keffiyeh neutra snackwave pork belly shoreditch. Prism austin mlkshk truffaut, `,
  },
  {
    id: 5,
    title: "egg attack",
    category: "lunch",
    price: 22.99,
    img: "./images/item-5.jpeg",
    desc: `franzen vegan pabst bicycle rights kickstarter pinterest meditation farm-to-table 90's pop-up `,
  },
  {
    id: 6,
    title: "oreo dream",
    category: "shakes",
    price: 18.99,
    img: "./images/item-6.jpeg",
    desc: `Portland chicharrones ethical edison bulb, palo santo craft beer chia heirloom iPhone everyday`,
  },
  {
    id: 7,
    title: "bacon overflow",
    category: "breakfast",
    price: 8.99,
    img: "./images/item-7.jpeg",
    desc: `carry jianbing normcore freegan. Viral single-origin coffee live-edge, pork belly cloud bread iceland put a bird `,
  },
  {
    id: 8,
    title: "american classic",
    category: "lunch",
    price: 12.99,
    img: "./images/item-8.jpeg",
    desc: `on it tumblr kickstarter thundercats migas everyday carry squid palo santo leggings. Food truck truffaut  `,
  },
  {
    id: 9,
    title: "quarantine buddy",
    category: "shakes",
    price: 16.99,
    img: "./images/item-9.jpeg",
    desc: `skateboard fam synth authentic semiotics. Live-edge lyft af, edison bulb yuccie crucifix microdosing.`,
  },
  {
    id: 10,
    title: "steak dinner",
    category: "dinner",
    price: 39.99,
    img: "./images/item-10.jpeg",
    desc: `skateboard fam synth authentic semiotics. Live-edge lyft af, edison bulb yuccie crucifix microdosing.`,
  },
];
// todo aggiungi nuovo item all'array menu
// class NuovoItem {
//   constructor (id, title, category, price, img, desc){
//     this.id = id;
//     this.title = title;
//     this.category = category;
//     this.price = price;
//     this.img = img;
//     this.desc = desc;
//   }
//  aggiungi()
// }

// let nuovoo = new NuovoItem

// function aggiungi(){
//   menu.push(NuovoItem)
// }

// menu.push(nuovo);

// seleziono il contenitore principale in cui inseriro dinamicamente il mio array
const sectionCenter = document.querySelector(".section-center");
const btnContainer = document.querySelector(".btn-container");

window.addEventListener("DOMContentLoaded", function () {
  // richiamo le funzione al caricamento della pagina
  displayMenuItems(menu);
  displayMenuBtns();
});

// creazione dinamica menu
function displayMenuItems(menuItems) {
  // mappando l'array ho accesso a ogni sua parte
  // e creare degli articles dinamicamente:
  let displayMenu = menuItems.map(function (item) {
    return `<article class="menu-item">
    <img src= ${item.img} class="photo" alt="menu item" />
    <div class="item-info">
      <header>
        <h4>${item.title}</h4>
        <h4 class="price">$${item.price}</h4>
      </header>
      <p class="item-text">
      ${item.desc}
      </p>
    </div>
  </article>`;
  });
  // console.log(displayMenu);
  // dato che il return mi da un array, utilizzo il metodo join (con apici vuote, per eliminare le virgole) per avere un'unica stringa
  displayMenu = displayMenu.join("");
  // console.log(displayMenu);

  // inserisco la stringa nell'html
  sectionCenter.innerHTML = displayMenu;
}

function displayMenuBtns() {
  //! funzione creazione dinamica btns categorie
  // ? in questo modo ottengo la categoria di ogni items, ma io voglio ottenere le uniche categorie uso quindi reduce:
  // const categories = menu.map(function (item) {
  //   return item.category;
  // });
  const categories = menu.reduce(
    function (values, item) {
      // se i valori non includono la categoria, pushala nell'array, altrimenti prosegui ritornando i valori
      if (!values.includes(item.category)) {
        values.push(item.category);
      }
      return values;
    },
    // all va chiaramente inserito manualmente
    ["all"]
  );
  // console.log(categories);
  const categoryBtns = categories
    .map(function (category) {
      return `<button class="filter-btn" type="button" data-category='${category}'>${category}</button>`;
    })
    // nella creazione dinamica del menu abbiamo usato una variabile let, in questo caso usiamo di proposito una const, quindi dovremo effettuare il .join nel seguente modo:
    .join("");
  console.log(categoryBtns);
  // inserisco la stringa nell'html
  btnContainer.innerHTML = categoryBtns;
  // devo selezionare i bottoni subito dopo la loro creazione dinamica
  const filterBtns = document.querySelectorAll(".filter-btn");
  // e ora devo filtrare per categoria
  filterBtns.forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      // in questo modo riesco arecuperare la dataset dei btns
      // console.log(e.currentTarget.dataset.category);
      const category = e.currentTarget.dataset.category;

      // uso il metodo filter per creare un nuovo array per categoria
      const menuCategory = menu.filter(function (a) {
        // console.log(menu.category);
        if (a.category === category) {
          // console.log(a);
          return a;
        }
      });
      if (category === "all") {
        displayMenuItems(menu);
      } else {
        displayMenuItems(menuCategory);
      }
    });
  });
}
