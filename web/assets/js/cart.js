// async function loadCartItems() {

//     const response = await fetch(
//             "LoadCartItems"

//             );

//     if (response.ok) {

//         const json = await response.json();

//         if (json.length == 0) {
//             Swal.fire({
//                 title: 'Error!',
//                 text: "Your cart is empty",
//                 icon: 'error',
//                 confirmButtonText: 'Cool'
//             }).then((result) => {
//                 // If 'Cool' button is clicked, reload the page
//                 if (result.isConfirmed) {
//                     window.location = "index.html"// Reload the page
//                 }
//             });
//             //            window.location = "index.html";

//         } else {



// //            document.getElementById("cart-item-title").innerHTML = json.product.title;

//             let cartItemContainer = document.getElementById("cart-item-container");
//             let cartItemRow = document.getElementById("cart-item-row");

//             cartItemContainer.innerHTML = "";

//             let totalQty = 0;
//             let total = 0;
//             let totalShipping = 0;
//             let cartSubTotal = 0;

//             json.forEach(item => {

//                 let itemSubtotal = (item.product.price * item.qty);

//                 total += itemSubtotal + item.product.shipping;
//                 totalQty += item.qty;
//                 totalShipping += item.product.shipping;
//                 cartSubTotal += itemSubtotal;


//                 let cartItemRowClone = cartItemRow.cloneNode(true);
//                 cartItemRowClone.querySelector("#cart-item-a").href = "details.html?id=" + item.product.id;
//                 cartItemRowClone.querySelector("#cart-item-id").innerHTML = item.product.id;
//                 cartItemRowClone.querySelector("#cart-item-img").src = "product_images/" + item.product.id + "/image1.png";
//                 cartItemRowClone.querySelector("#cart-item-title").innerHTML = item.product.title;
//                 cartItemRowClone.querySelector("#cart-item-price").innerHTML = "Rs. " + new Intl.NumberFormat(
//                         "en-US", {
//                             minimumFractionDigits: 2
//                         }).format(item.product.price);
//                 cartItemRowClone.querySelector("#cart-item-shipping").innerHTML = "Rs. " + new Intl.NumberFormat(
//                         "en-US", {
//                             minimumFractionDigits: 2
//                         }).format(item.product.shipping);
//                 cartItemRowClone.querySelector("#cart-item-qty").value = item.qty;
//                 cartItemRowClone.querySelector("#cart-item-subtotal").innerHTML = "Rs. " + new Intl.NumberFormat(
//                         "en-US", {
//                             minimumFractionDigits: 2
//                         }).format((itemSubtotal));
//                 cartItemContainer.appendChild(cartItemRowClone);


//             });
//             document.getElementById("cart-total-qty").innerHTML = totalQty;
//             document.getElementById("cart-item-total").innerHTML = "Rs. " + new Intl.NumberFormat(
//                     "en-US", {
//                         minimumFractionDigits: 2
//                     }).format((cartSubTotal));
//             document.getElementById("cart-shipping-total").innerHTML = "Rs. " + new Intl.NumberFormat(
//                     "en-US", {
//                         minimumFractionDigits: 2
//                     }).format((totalShipping));
//             document.getElementById("cart-total").innerHTML = "Rs. " + new Intl.NumberFormat(
//                     "en-US", {
//                         minimumFractionDigits: 2
//                     }).format((total));
//         }



//     } else {
//         Swal.fire({
//             title: 'Error!',
//             text: "Request faild",
//             icon: 'error',
//             confirmButtonText: 'Cool'
//         })
//     }

// }


// async  function removefromCart() {

//     const id = document.getElementById("cart-item-id").innerText;

//     const response = await fetch(
//             "removefromCart?id=" + id

//             );

//     if (response.ok) {

//         const json = await response.json();

//         if (json.success) {
//             Swal.fire({
//                 title: 'Success!',
//                 text: json.content,
//                 icon: 'success',
//                 confirmButtonText: 'Cool'
//             }).then((result) => {
//                 // If 'Cool' button is clicked, reload the page
//                 if (result.isConfirmed) {
//                     window.location.reload();// Reload the page
//                 }
//             });

//         } else {
//             Swal.fire({
//                 title: 'Error!',
//                 text: json.content,
//                 icon: 'error',
//                 confirmButtonText: 'Cool'
//             })
//         }

//     } else {

//     }
// }



// let cart = {};

// function addToCart(productId) {
//   const product = PRODUCTS.find(p => p.id === productId);
//   if (!product) return;

//   if (cart[productId]) {
//     cart[productId].qty += 1;      // already in cart → bump qty
//   } else {
//     cart[productId] = { ...product, qty: 1 };  // new item
//   }

//   updateCartCount();   // update the badge on your cart icon
//   updateCartSidebar(); // refresh the sidebar list
// }




/* ============================================================
   cart.js  –  Cart logic (works across all pages)
   Uses localStorage key: "cart"
   ============================================================ */

/* ============================================================
   Core cart helpers
   ============================================================ */

/** Return current cart array from localStorage */
function getCart() {
  return JSON.parse(localStorage.getItem("cart") || "[]");
}

/** Persist cart array to localStorage */
function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

/** Total item count (sum of quantities) */
function cartCount() {
  return getCart().reduce((sum, item) => sum + item.qty, 0);
}

/* ============================================================
   addToCart  –  called from product cards via onclick
   ============================================================ */
function addToCart(productId) {
  /* PRODUCTS must be defined in index.js (loaded before cart.js) */
  if (typeof PRODUCTS === "undefined") {
    console.error("PRODUCTS array not found. Make sure index.js loads before cart.js");
    return;
  }

  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  let cart = getCart();
  const existing = cart.find(i => i.id === productId);

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }

  saveCart(cart);
  updateCartBadge();

  /* Visual feedback on the clicked button */
  flashCartBtn(productId);

  /* Toast notification */
  if (typeof showToast === "function") {
    showToast(`${product.title} added to cart!`, "success");
  } else if (window.Swal) {
    Swal.fire({ toast: true, position: "top-end", icon: "success",
      title: `${product.title} added to cart!`,
      showConfirmButton: false, timer: 1800, timerProgressBar: true });
  }
}

/* ============================================================
   updateCartBadge  –  refreshes the count bubble on cart icon
   ============================================================ */
function updateCartBadge() {
  const count = cartCount();

  /* Find / create the badge span inside the cart anchor */
  const cartLink = document.querySelector('a[href="cart.html"].header__action-btn');
  if (!cartLink) return;

  let badge = cartLink.querySelector(".count");
  if (!badge) {
    badge = document.createElement("span");
    badge.className = "count";
    cartLink.appendChild(badge);
  }

  badge.textContent = count;
  badge.style.display = count > 0 ? "flex" : "none";

  /* Pulse animation */
  badge.classList.remove("badge-pulse");
  void badge.offsetWidth;                  // reflow trick to restart animation
  badge.classList.add("badge-pulse");
}

/* ============================================================
   flashCartBtn  –  brief visual confirmation on the card button
   ============================================================ */
function flashCartBtn(productId) {
  /* The cart button inside the product card */
  const card = document.querySelector(`.product__item[data-id="${productId}"] .cart__btn`);
  if (!card) return;

  const icon = card.querySelector("i");
  if (icon) { icon.className = "fi fi-rs-check"; }
  card.style.background = "#e02c6d";
  card.style.color       = "#fff";

  setTimeout(() => {
    if (icon) icon.className = "fi fi-rs-shopping-bag-add";
    card.style.background = "";
    card.style.color       = "";
  }, 1500);
}

/* ============================================================
   Cart page  (cart.html)  –  render full cart table
   ============================================================ */
function renderCartPage() {
  const wrapper = document.getElementById("cart-page-items");
  if (!wrapper) return;        // not on cart.html

  const cart = getCart();

  if (!cart.length) {
    wrapper.innerHTML = `
      <tr><td colspan="6" style="text-align:center;padding:40px;color:#999;">
        Your cart is empty. <a href="shop.html" style="color:#e02c6d">Continue shopping →</a>
      </td></tr>`;
    updateCartSummary(0);
    return;
  }

  wrapper.innerHTML = cart.map(item => `
    <tr class="cart__row" data-id="${item.id}">
      <td class="cart__image-box">
        <img src="${item.img1}" alt="${item.title}" class="cart__img"
             onerror="this.src='assets/img/product-1-1.jpg'">
      </td>
      <td class="cart__title"><h3>${item.title}</h3><span>${item.category}</span></td>
      <td class="cart__price">$${item.price.toFixed(2)}</td>
      <td class="cart__quantity">
        <div class="cart__qty-controls">
          <button onclick="changeQty(${item.id}, -1)" class="qty__btn">−</button>
          <span class="qty__value">${item.qty}</span>
          <button onclick="changeQty(${item.id}, +1)" class="qty__btn">+</button>
        </div>
      </td>
      <td class="cart__subtotal">$${(item.price * item.qty).toFixed(2)}</td>
      <td class="cart__remove">
        <button onclick="removeFromCart(${item.id})" class="remove__btn" title="Remove">
          <i class="fi fi-rs-trash"></i>
        </button>
      </td>
    </tr>`).join("");

  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  updateCartSummary(total);
}

function updateCartSummary(total) {
  const els = document.querySelectorAll(".cart__total-price, #cart-total-amount");
  els.forEach(el => el.textContent = `$${total.toFixed(2)}`);
}

/* ============================================================
   changeQty  –  +/- buttons on cart page
   ============================================================ */
function changeQty(id, delta) {
  let cart = getCart();
  const item = cart.find(i => i.id === id);
  if (!item) return;
  item.qty = Math.max(1, item.qty + delta);
  saveCart(cart);
  renderCartPage();
  updateCartBadge();
}

/* ============================================================
   removeFromCart
   ============================================================ */
function removeFromCart(id) {
  let cart = getCart().filter(i => i.id !== id);
  saveCart(cart);
  renderCartPage();
  updateCartBadge();
  if (typeof showToast === "function") showToast("Item removed from cart.", "info");
}

/* ============================================================
   clearCart  –  "Clear All" button on cart page
   ============================================================ */
function clearCart() {
  saveCart([]);
  renderCartPage();
  updateCartBadge();
}

/* ============================================================
   Init on every page load
   ============================================================ */
document.addEventListener("DOMContentLoaded", () => {
  updateCartBadge();   // always sync the badge
  renderCartPage();    // only does anything on cart.html
});
