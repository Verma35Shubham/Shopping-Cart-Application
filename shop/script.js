let items = [];
let cart = [];
let menContainer = document.getElementById("men-container");
let womenContainer = document.getElementById("women-container");
let jewelleryContainer = document.getElementById("jewellery-container");
let electronicsContainer = document.getElementById("electronics-container");

let btnAll = document.getElementById("btn-all");
let btnMen = document.getElementById("btn-men");
let btnWomen = document.getElementById("btn-women");
let btnJewellery = document.getElementById("btn-jewellery");
let btnElectronic = document.getElementById("btn-electronic");

function onLoad() {
  if (!sessionStorage.getItem("email")) {
    window.location.href = "../";
  } else {
    fetch("https://fakestoreapi.com/products")
      .then(async (res) => {
        items = await res.json();
        showItems(items);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

function showItems(products) {
  menContainer.innerHTML = "";
  womenContainer.innerHTML = "";
  jewelleryContainer.innerHTML = "";
  electronicsContainer.innerHTML = "";

  for (let item of products) {
    let div = document.createElement("div");

    div.className = "col-3 ";
    div.innerHTML = `<div class="card mb-4">
      <img src='${item.image}' class="card-img-top " alt="shirt">
      <div class="card-body ">
        <p class="item-title">Title: ${
          item.title && item.title.length > 20
            ? item.title.substring(0, 20) + "..."
            : item.title
        }</p>
        <p class="item-price">Price: $${item.price}</p>
        <a class="btn" onclick = "addToCart(${item.id})">Add Item</a>
      </div>
    </div>`;

    if (item.category == "men's clothing") {
      menContainer.append(div);
    } else if (item.category == "women's clothing") {
      womenContainer.append(div);
    } else if (item.category == "jewelery") {
      jewelleryContainer.append(div);
    } else if (item.category == "electronics") {
      electronicsContainer.append(div);
    }
  }
}

let btnFilter = document.getElementsByClassName("btn-filter");
for (let i = 0; i < btnFilter.length; i++) {
  btnFilter[i].addEventListener("click", (event) => {
    let btnName = event.target.id;
    console.log(event.target.id);
    if (btnName == "btn-all") {
      menContainer.parentElement.style.display = "inline-flex";
      womenContainer.parentElement.style.display = "inline-flex";
      jewelleryContainer.parentElement.style.display = "inline-flex";
      electronicsContainer.parentElement.style.display = "inline-flex";
    } else if (btnName == "btn-men") {
      menContainer.parentElement.style.display = "inline-flex";
      womenContainer.parentElement.style.display = "none";
      jewelleryContainer.parentElement.style.display = "none";
      electronicsContainer.parentElement.style.display = "none";
    } else if (btnName == "btn-women") {
      menContainer.parentElement.style.display = "none";
      womenContainer.parentElement.style.display = "inline-flex";
      jewelleryContainer.parentElement.style.display = "none";
      electronicsContainer.parentElement.style.display = "none";
    } else if (btnName == "btn-jewellery") {
      menContainer.parentElement.style.display = "none";
      womenContainer.parentElement.style.display = "none";
      jewelleryContainer.parentElement.style.display = "inline-flex";
      electronicsContainer.parentElement.style.display = "none";
    } else if (btnName == "btn-electronics") {
      menContainer.parentElement.style.display = "none";
      womenContainer.parentElement.style.display = "none";
      jewelleryContainer.parentElement.style.display = "none";
      electronicsContainer.parentElement.style.display = "inline-flex";
    }
  });
}

function addToCart(productId) {
  let localStorageItem = localStorage.getItem("cart");
  cart = localStorageItem ? JSON.parse(localStorageItem) : null || cart || [];
  cart.push(items.find((p) => p.id == productId));
  console.log(cart);
  localStorage.setItem("cart", JSON.stringify(cart));
}

// range value

var el = document.getElementById("curr");
var r = document.getElementById("ratingRange");
el.innerText = r.valueAsNumber;
r.addEventListener("change", () => {
  el.innerText = r.valueAsNumber;
});

// price range checkbox

// for (let checkbox of priceRangeCheckbox) {
//   checkbox.addEventListener("change", (event) => {
//     console.log(event.target.id, event.target.value);
//     filterPriceRange();
//   });
// }

let filterBtn = document.getElementById("btn-filter");
filterBtn.addEventListener("click", () => {
  let filteredItem = items.filter((i) => i.rating.rate <= r.valueAsNumber);
  console.log("rating", filteredItem);
  let priceRangeCheckbox = document.getElementsByClassName("checkPriceRange");
  for (let checkbox of priceRangeCheckbox) {
    console.log(checkbox.id, checkbox.checked);
    if (checkbox.checked) {
      switch (checkbox.id) {
        case "below-25Checkbox":
          items
            .filter((i) => i.price < 25)
            .forEach((item) => {
              if (!filteredItem.find((i) => i.id == item.id)) {
                filteredItem.push(item);
              }
            });
          console.log("below 25", filteredItem);
          break;
        case "between-25to50Checkbox":
          items
            .filter((i) => i.price >= 25 && i.price < 50)
            .forEach((item) => {
              if (!filteredItem.find((i) => i.id == item.id)) {
                //filteredItem.push(item);
              }
            });
          break;
        case "between-50to100Checkbox":
          items
            .filter((i) => i.price >= 50 && i.price < 100)
            .forEach((item) => {
              if (!filteredItem.find((i) => i.id == item.id)) {
                //filteredItem.push(item);
              }
            });
          break;
        case "above-100Checkbox":
          items
            .filter((i) => i.price >= 100)
            .forEach((item) => {
              if (!filteredItem.find((i) => i.id == item.id)) {
                //filteredItem.push(item);
              }
            });
          break;
        default:
          break;
      }
    }
  }
  console.log("last", filteredItem);
  showItems(filteredItem);
});

// top search bar functioality

function searchItem(event) {
  let inputSearch = document.getElementById("search-input");
  let filteredItem = items.filter(
    (item) => item.title.indexOf(inputSearch.value) > -1);
  showItems(filteredItem);
}