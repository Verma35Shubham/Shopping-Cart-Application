let cart = [];

function onLoad() {
  let localStorageItem = localStorage.getItem("cart");
  cart = localStorageItem ? JSON.parse(localStorageItem) : [];
  showItems(cart);
  showCheckList(cart);
}

function showItems(items) {
  let itemContainer = document.getElementById("item-container");
  itemContainer.innerHTML = "";
  for (let item of items) {
    let div = document.createElement("div");
    div.className = "col";
    div.innerHTML = ` <div class="card cards">
          <img src="${item.image}" class="card-img-top" alt="shirt">
          <div class="card-body body">
          <p class="item-title">Title: ${
            item.title && item.title.length > 20
              ? item.title.substring(0, 20) + "..."
              : item.title
          }</p>
            <p class="item-price">Price: $${item.price}</p>
            <a class="btn btn-primary" onclick="removeItem(${
              item.id
            })">Remove Item</a>
          </div>
        </div>
      `;

    itemContainer.append(div);
  }
}

function showCheckList(items) {
  let totalPrice = 0;
  let checkListContainer = document.getElementById("checklist-container");
  checkListContainer.innerHTML = "";
  for (let item of items) {
    let div = document.createElement("div");
    div.className = "item";
    div.innerHTML = `<p class="item-name">${
      item.title && item.title.length > 10
        ? item.title.substring(0, 10) + "..."
        : item.title
    }</p>
    <p class="item-price">$${item.price}</p>`;
    checkListContainer.append(div);
    totalPrice += item.price;
  }
  document.getElementById("total-price").innerText =
    "$" + totalPrice.toFixed(2);
}

function removeItem(itemId) {
  cart = cart.filter((item) => item.id != itemId);
  localStorage.setItem("cart", JSON.stringify(cart));
  showItems(cart);
  showCheckList(cart);
}

// checkout button

let checkoutBtn = document.getElementById("btn-checkout");
checkoutBtn.addEventListener("click", () => {
  localStorage.removeItem("cart");
  alert("items purchased");
  window.location.href = "../shop";
});